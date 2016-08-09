import configManager from './config.manager'

var config = {
    apiDomain: '',
    version: 'Development',
    title: '玩转朋友圈'
}

config = configManager.extend(config)

export default config
