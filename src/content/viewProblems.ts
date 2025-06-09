type Problem = {
    id: string
    title: string
    tried: boolean
    solved: boolean
    solvedCount: number
}

export function run(): void {
    const main = (): void => {
        const table = document.createElement('table')
        table.id = 'problems'
        table.className = 'table table-dark mt-5'
        document.getElementById('container')!.prepend(table)

        const problems = getProblems()

        const thead = document.createElement('thead')
        const headerRow = document.createElement('tr')
        ;['#', '제목', '맞힌 사람'].forEach((text) => {
            const th = document.createElement('th')
            th.textContent = text
            headerRow.appendChild(th)
        })
        thead.appendChild(headerRow)
        table.appendChild(thead)

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
            row.appendChild(solvedCountCell)

            tbody.appendChild(row)
        })
        table.appendChild(tbody)
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main)
    } else {
        main()
    }
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
