Feature: Get User with API

  Scenario: Get User
    Given the endpoint http://localhost:8080 is available
    When a get user request is sent
    Then the result is success