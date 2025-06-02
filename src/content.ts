import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import common from './content/common.js'

common()

const mid: string = new URLSearchParams(window.location.search).get('mid') || ''

if (mid === '') {
    import('./content/home.ts').then(m => m.run())
}