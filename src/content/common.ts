const navbar = `<div class="navbar-wrapper">
  <nav class="navbar navbar-expand navbar-dark py-2 mx-auto" style="max-width: 960px;">
    <div class="container-fluid gap-20">
      <a class="navbar-brand" href="/"><img src="/bbs/image/favicon.png"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-menu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="nav-menu">
        <ul class="navbar-nav me-auto mb-0">
          <li class="nav-item"><a class="nav-link" href="?mid=viewProblems">문제</a></li>
          <li class="nav-item"><a class="nav-link" href="?mid=comp">대회</a></li>
          <li class="nav-item"><a class="nav-link" href="?mid=notice">공지</a></li>
        </ul>
      </div>
    </div>
  </nav>
</div>`

const loginMenu = `<span class="navbar-text">
  <div class="dropdown d-inline">
    <a href="#" id="login-btn" data-bs-toggle="dropdown" aria-expanded="false">로그인</a>
    <div id="login-dropdown" class="dropdown-menu dropdown-menu-end dropdown-menu-dark p-3 shadow-sm" style="min-width: 200px;">
      <form></form>
    </div>
  </div>
  <span class="mx-3">|</span>
  <a href="?mid=main&act=dispMemberSignUpForm">회원가입</a>
</span>`

const loginDropdown = `<div class="mb-2">
  <input type="text" class="form-control form-control-sm bg-dark text-white border-secondary" name="user_id" required placeholder="아이디" style="--bs-placeholder-color: #ccc;">
</div>
<div class="mb-2">
  <input type="password" class="form-control form-control-sm bg-dark text-white border-secondary" name="password" required placeholder="비밀번호" style="--bs-placeholder-color: #ccc;">
</div>
<input name="keep_signed" value="Y" type="checkbox" checked hidden>
<button type="submit" class="btn btn-primary btn-sm w-100">로그인</button>`

const userMenu = `<span class="navbar-text" id="user-menu">
  <a href="?mid=viewProblems&SEARCH=99999">북마크</a>
  <span class="mx-3">|</span>
  <a href="?mid=member&act=dispMemberInfo"></a>
  <span class="mx-3">|</span>
  <a href="#">로그아웃</a>
</span>`

export default function (): void {
    const main = (): void => {
        document.getElementById('footer')?.remove()
        document.getElementsByClassName('e1')[0]?.remove()
        document.getElementById('content')?.style.setProperty('float', 'none')
        document.querySelector('head > style')?.remove()

        const container = document.getElementById('container')!
        container.insertAdjacentHTML('beforebegin', navbar)

        const form = document.querySelector('#header > form')!
        /*
         * 로그인하지 않으면 account에는 id를 입력하는 <input>이 들어있고,
         * 로그인하면 사용자 이름이 <strong>이 들어있다.
         */
        const account = form.childNodes[1].childNodes[1]!
        const accountName = account.textContent?.trim() || ''

        if (account.nodeName === 'INPUT') {
            document.getElementById('nav-menu')!.insertAdjacentHTML('beforeend', loginMenu)

            document.getElementById('login-dropdown')!.appendChild(form)
            form.innerHTML = loginDropdown
        } else {
            document.getElementById('nav-menu')!.insertAdjacentHTML('beforeend', userMenu)
            document.querySelector('#nav-menu > span > a:nth-child(3)')!.textContent = accountName

            document
                .querySelector('#nav-menu > span > a:nth-child(5)')!
                .addEventListener('click', async (e) => {
                    e.preventDefault()

                    try {
                        const resp = await fetch('?act=dispMemberLogout')

                        if (resp.ok) {
                            location.reload()
                        } else {
                            alert('로그아웃 실패')
                        }
                    } catch {
                        alert('요청 중 오류')
                    }
                })
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main)
    } else {
        main()
    }
}
