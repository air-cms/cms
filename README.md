# air-cms/cms
A simple content management system for Blog sites.

## Environment Variables
|Name|Default|Required|Function|
|:-|:-|:-|:-|
|NODE_ENV|-|no|Set this to "production" to not load environment variables from a .env file.|
|APP_PORT|-|yes|The port of the air-cms (express) webserver.|
|LOGGER_FORMAT|`[%L] %m`|no|The format of the internal logger. More infos [here](https://github.com/air-cms/cms#logger-format)|
|LOG_LEVELS|`iwe`|no|The flags to activate diffrent log states, More infos [here](https://github.com/air-cms/cms#logger-levels)|

## Internal logger

### Logger-Format
The internal logger used is from the nodejs-logger from Laurenz1606 (@laurenz1606/logger).

### Logger-Levels
The internal logger used is from the nodejs-logger from Laurenz1606 (@laurenz1606/logger).
