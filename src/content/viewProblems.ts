type Problem = {
    id: string
    title: string
    tried: boolean
    solved: boolean
    solvedCount: number
}

export function run(): void {
    const main = (): void => {
        const container = document.getElementById('container')!

        const search = new URLSearchParams(window.location.search).get('SEARCH') || '0'
        const table = search === '-1' ? createArchiveTable() : createTable()
        container.prepend(table)

        const viewMenu = createViewMenu()
        container.prepend(viewMenu)
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main)
    } else {
        main()
    }
}

function createTable(): HTMLTableElement {
    const table = document.createElement('table')
    table.id = 'problems'
    table.className = 'table table-dark mt-5'

    const thead = document.createElement('thead')
    const headerRow = document.createElement('tr')
    ;['#', '제목', '맞힌 사람'].forEach((text) => {
        const th = document.createElement('th')
        th.textContent = text
        headerRow.appendChild(th)
    })
    thead.appendChild(headerRow)
    table.appendChild(thead)

    const problems = getProblems()
    const tbody = document.createElement('tbody')
    problems.forEach((problem) => {
        const row = document.createElement('tr')

        const idCell = document.createElement('td')
        const link1 = document.createElement('a')
        link1.href = `/?mid=prob_page&NO=${problem.id}`
        link1.textContent = problem.id.toString()
        idCell.appendChild(link1)
        row.appendChild(idCell)

        if (problem.tried) {
            if (problem.solved) {
                link1.className = 'problem-ac'
            } else {
                link1.className = 'problem-wa'
            }
        }

        const titleCell = document.createElement('td')
        const link2 = document.createElement('a')
        link2.href = `/?mid=prob_page&NO=${problem.id}`
        link2.textContent = problem.title
        titleCell.appendChild(link2)
        row.appendChild(titleCell)

        const solvedCountCell = document.createElement('td')
        solvedCountCell.textContent = problem.solvedCount.toString()
        solvedCountCell.style.textAlign = 'right'
        row.appendChild(solvedCountCell)

        tbody.appendChild(row)
    })
    table.appendChild(tbody)
    return table
}

function createArchiveTable(): HTMLTableElement {
    const table = document.createElement('table')
    table.id = 'problems'
    table.className = 'table table-dark mt-5'

    const thead = document.createElement('thead')
    const headerRow = document.createElement('tr')
    const th = document.createElement('th')
    th.textContent = '대회 이름'
    headerRow.appendChild(th)
    thead.appendChild(headerRow)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')
    const archives: { name: string; search: string }[] = [
        { name: '한국정보올림피아드 초등부', search: '13000' },
        { name: '한국정보올림피아드 중등부', search: '14000' },
        { name: '한국정보올림피아드 고등부', search: '15000' },
        { name: 'USA Computing Olympiad Training', search: '10000' },
        { name: 'USA Computing Olympiad Bronze–Silver', search: '11000' },
        { name: 'USA Computing Olympiad Gold', search: '12000' }
    ]
    archives.forEach((archive) => {
        const row = document.createElement('tr')
        const cell = document.createElement('td')
        const link = document.createElement('a')
        link.href = '?mid=viewProblems&SEARCH=' + archive.search
        link.textContent = archive.name
        cell.appendChild(link)
        row.appendChild(cell)
        tbody.appendChild(row)
    })
    table.appendChild(tbody)

    return table
}

function createViewMenu(): HTMLDivElement {
    const viewMenu = document.createElement('div')
    viewMenu.className = 'row'

    const left = document.createElement('div')
    left.className = 'col-10'

    const nav = document.createElement('ul')
    nav.className = 'nav nav-pills'

    const search = new URLSearchParams(window.location.search).get('SEARCH') || '0'
    const navItems = {
        '0': '전체',
        '99': '최근',
        '444': '실패',
        '777': '성공',
        '99999': '북마크',
        '-1': '출처'
    }
    for (const [key, value] of Object.entries(navItems)) {
        const li = document.createElement('li')
        li.className = 'nav-item'

        const a = document.createElement('a')
        a.className = 'nav-link'
        a.classList.toggle('active', search === key)
        a.href = `?mid=viewProblems&SEARCH=${key}`
        a.textContent = value

        li.appendChild(a)
        nav.appendChild(li)
    }

    const searchNum = Number(search)
    if (searchNum >= 10000 && searchNum <= 15000) {
        const li = document.createElement('li')
        li.className = 'nav-item'
        const a = document.createElement('a')
        a.className = 'nav-link active'
        a.href = '#'
        if (searchNum <= 12000) {
            a.textContent = 'USACO'
        } else {
            a.textContent = 'KOI'
        }
        li.appendChild(a)
        nav.appendChild(li)
    }

    left.appendChild(nav)
    viewMenu.appendChild(left)

    const right = document.createElement('div')
    right.className = 'col-2'

    const form = document.createElement('form')
    form.className = 'd-flex'
    form.style.justifyContent = 'flex-end'

    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'form-control form-control-sm'
    input.placeholder = '검색어'
    input.name = 'WORD'
    input.value = new URLSearchParams(window.location.search).get('WORD') || ''

    form.appendChild(input)
    right.appendChild(form)
    viewMenu.appendChild(right)

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const word = input.value.trim()
        const newParams = new URLSearchParams()
        newParams.set('mid', 'viewProblems')
        newParams.set('SEARCH', '0')
        if (word) newParams.set('WORD', word)
        location.search = newParams.toString()
    })

    return viewMenu
}

function getProblems(): Problem[] {
    const table = document.getElementById('form1')!
    let problems: Problem[] = []

    const rows = Array.from(table.getElementsByTagName('table'))
    for (const row of rows.slice(1)) {
        const tr = row.children[1].children[0]!
        const id = tr.children[1].textContent?.trim() || '-'
        const title =
            tr.children[2].querySelector('span > font:nth-child(1)')?.textContent?.trim() || ''
        const solvedCount = parseInt(tr.children[3].textContent?.trim() || '0')

        const marker = tr.children[0].getElementsByTagName('img')
        let tried = false,
            solved = false
        if (marker[0]) {
            tried = true
            if (marker[0].src.includes('accept')) {
                solved = true
            }
        }

        problems.push({
            id,
            title,
            tried,
            solved,
            solvedCount
        })
    }

    return problems
}
