{
    'name': 'Testimonials Variety Pack',
    'summary': '30+ Modern Testimonial Layout Variations',
    'category': 'Theme/Testimonials',
    'version': '18.0.1.0',
    'author': 'Denglee',
    'depends': [
        'website',
        'theme_default',
    ],
    'data': [
        'views/testimonials.xml',
    ],

'live_test_url': 'https://testimonialsgd.netlify.app/',
    'price': 3.99,
    'currency': 'USD',

    'assets': {
        'web._assets_primary_variables': [
            '/theme_testimonial/static/src/scss/primary_variables.scss',
        ],
        'web.assets_frontend': [
            '/theme_testimonial/static/src/scss/testimonials.scss',
            '/theme_testimonial/static/src/js/testimonials.js',
        ],
    },
    'images': [

        'static/description/theme_marquee_cover.png',

        'static/description/theme_marquee_screenshot.png',

    ],
    'license': 'LGPL-3',
    'application': True,
    'installable': True,
}
