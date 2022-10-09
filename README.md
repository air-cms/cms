# air-cms/cms
A simple content management system for Blog sites.

## Environment Variables
|Name|Default|Required|Function|
|:-|:-|:-|:-|
|NODE_ENV|-|no|Set this to "production" to not load environment variables from a .env file.|
|APP_PORT|-|yes|The port of the air-cms (express) webserver.|
|CORS_ORIGIN|`*`|no|The cors origin option.|
|MONGO_URL|-|yes|The URL for the mongoDB (mongoose) connection.|
|REDIS_URL|-|yes|The URL for the redis (ioredis) connection.|
|LOGGER_FORMAT|`[%L] %m`|no|The format of the internal logger. More infos [here](https://github.com/air-cms/cms/blob/main/README.md#logger-format)|
|LOG_LEVELS|`iwe`|no|The flags to activate diffrent log states, More infos [here](https://github.com/air-cms/cms/blob/main/README.md#logger-levels)|
|DEBUG_MODE|-|no|Set to `ON` (any truthy value) to enable.|
|AUTH_ACCESS_TOKEN|-|yes|The secret for the JWT accesstokens.|
|AUTH_REFRESH_TOKEN|-|yes|The secret for the JWT refreshtokens.|
|AUTH_VALIDATE_EMAIL|`true`|no|Enable or disable Email validation.|
|AUTH_EXPIRESS_IN|`900`|no|Time that a JWT accesstokens is valid (in seconds).|
|AUTH_PASSWORD_RULE|`Y-Y-Y-Y-8`|no|The Password validation rule.|


## Internal logger

### Logger-Format
The internal logger used is from the nodejs-logger from Laurenz1606 (@laurenz1606/logger).

### Logger-Levels
The internal logger used is from the nodejs-logger from Laurenz1606 (@laurenz1606/logger).

## Auth

### Password rules