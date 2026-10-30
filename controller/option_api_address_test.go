package controller

import (
	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/setting/config"
	"github.com/QuantumNous/new-api/setting/operation_setting"
	"github.com/QuantumNous/new-api/setting/system_setting"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestUpdateOptionRejectsInvalidAPIAddress(t *testing.T) {
	for _, value := range []string{"/relative", "ftp://api.example.com", "https://user:password@api.example.com", "https://api.example.com?key=test", "https://api.example.com#fragment", " https://api.example.com", "https://"} {
		t.Run(value, func(t *testing.T) {
			body, err := common.Marshal(map[string]string{"key": "general_setting.api_address", "value": value})
			require.NoError(t, err)
			response := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(response)
			c.Request = httptest.NewRequest(http.MethodPut, "/api/option/", strings.NewReader(string(body)))
			UpdateOption(c)
			var payload struct {
				Success bool `json:"success"`
			}
			require.NoError(t, common.Unmarshal(response.Body.Bytes(), &payload))
			assert.False(t, payload.Success)
		})
	}
}

func TestAPIAddressStatusKeepsServerAddress(t *testing.T) {
	oldAPI := operation_setting.GetGeneralSetting().APIAddress
	oldServer := system_setting.ServerAddress
	t.Cleanup(func() {
		operation_setting.GetGeneralSetting().APIAddress = oldAPI
		system_setting.ServerAddress = oldServer
	})
	system_setting.ServerAddress = "https://console.example.com"
	for _, address := range []string{"https://api.example.com", ""} {
		require.NoError(t, config.GlobalConfig.LoadFromDB(map[string]string{"general_setting.api_address": address}))
		response := httptest.NewRecorder()
		c, _ := gin.CreateTestContext(response)
		c.Request = httptest.NewRequest(http.MethodGet, "/api/status", nil)
		GetStatus(c)
		var result struct {
			Success bool           `json:"success"`
			Data    map[string]any `json:"data"`
		}
		require.NoError(t, common.Unmarshal(response.Body.Bytes(), &result))
		require.True(t, result.Success)
		assert.Equal(t, address, result.Data["api_address"])
		assert.Equal(t, "https://console.example.com", result.Data["server_address"])
	}
}
