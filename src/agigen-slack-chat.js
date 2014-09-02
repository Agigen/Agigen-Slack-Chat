(function(window) {
    'use strict';

    window.slackChat = function(args) {
        var self = this,
            channel = args.channel,
            emoji = args.emoji,
            image = args.image,
            slack_request_url = 'https://'+ args.team +'.slack.com/services/hooks/incoming-webhook?token=' + args.token;

        self.sendMessage = function(name, text) {
            if(name && name.trim() && text && text.trim()) {
                var data = {
                    'text': text,
                    'username': name,
                    'channel': channel,
                    'icon_url': image ? image : '',
                    'icon_emoji': emoji ? emoji : (image ? '' : ':neckbeard:')
                };

                var xhr = new XMLHttpRequest();
                xhr.open('POST', slack_request_url, true);
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