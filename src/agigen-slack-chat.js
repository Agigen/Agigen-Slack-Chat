(function(window) {
    'use strict';

    window.slackChat = function(args) {
        var self = this,
            channel = args.channel,
            slack_url = 'https://'+ args.team +'.slack.com/services/hooks/incoming-webhook?token=' + args.token;

        self.sendMessage = function(name, text) {
            if(name.trim() && text.trim()) {
                var data = {
                    'text': text,
                    'username': name,
                    'icon_emoji': ':neckbeard:',
                    'channel': channel
                };
                var xhr = new XMLHttpRequest();
                xhr.open('POST', slack_url, true);

                xhr.send(JSON.stringify(data));

                xhr.onreadystatechange = function() {
                    if(xhr.readyState === 4) {
                        if(xhr.status === 200) {
                            console.log('Stay right here '+ name +', we\'ll get back to you asap');
                        }else {
                            console.log('Error', 'Check your chat config.');
                        }
                    }
                };
            }else {
                console.log('Something went wrong..');
            }
        };

        window._ = function(name, text) {
            self.sendMessage(name, text);
        };
    };

}(window));