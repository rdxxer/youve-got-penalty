import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import common from './content/common.js'

common()

const mid: string = new URLSearchParams(window.location.search).get('mid') || 'main'
//const action: string = new URLSearchParams(window.location.search).get('action') || ''

switch (mid) {
    case 'main':
        import('./content/main.ts').then((m) => m.run())
        break
    case 'viewProblems':
        import('./content/viewProblems.ts').then((m) => m.run())
        break
}
