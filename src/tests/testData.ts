export const documentData = [
    {
        type: 'tag',
        name: 'html',
        children: [
            {
                type: 'tag',
                name: 'head',
                children: [
                    {
                        type: 'tag',
                        name: 'title',
                        children: [
                            {
                                type: 'text',
                                data: 'Example Page'
                            }
                        ]
                    },
                    {
                        type: 'tag',
                        name: 'link',
                        attribs: {
                            href: '/styles/main.css',
                            rel: 'stylesheet'
                        }
                    }
                ]
            },
            {
                type: 'tag',
                name: 'body',
                children: [
                    {
                        type: 'tag',
                        name: 'img',
                        attribs: {
                            src: '/images/example.jpg',
                            alt: 'Example Image'
                        }
                    },
                    {
                        type: 'tag',
                        name: 'a',
                        attribs: {
                            href: '/page2'
                        },
                        children: [
                            {
                                type: 'text',
                                data: 'Go to page 2'
                            }
                        ]
                    },
                    {
                        type: 'tag',
                        name: 'script',
                        attribs: {
                            src: '/scripts/main.js'
                        }
                    }
                ]
            }
        ]
    }
];