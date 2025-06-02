const login: string = `<div class="navbar-wrapper">
  <nav class="navbar navbar-expand navbar-dark bg-dark py-2">
    <div class="container-fluid gap-20">
      <a class="navbar-brand" href="/"><b>KOISTUDY</b></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
          <li class="nav-item"><a class="nav-link" href="?mid=viewProblems">문제</a></li>
          <li class="nav-item"><a class="nav-link" href="?mid=comp">대회</a></li>
          <li class="nav-item"><a class="nav-link" href="?mid=notice">공지</a></li>
        </ul>
        <span class="navbar-text">
          <a href="#" id="loginBtn">로그인</a> | <a href="?mid=main&act=dispMemberSignUpForm">회원가입</a>
        </span>
      </div>
    </div>

    <div id="loginPopover" class="card p-3 shadow-sm" style="width: 300px; display: none; position: absolute; top: 100%; right: 0;">
      <form>
        <div class="mb-2">
          <input type="text" class="form-control" id="userId" placeholder="아이디" required>
        </div>
        <div class="mb-2">
          <input type="password" class="form-control" id="password" placeholder="비밀번호" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">로그인</button>
      </form>
    </div>
  </nav>
</div>`

export default function (): void {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('header')?.remove()
    document.getElementById('footer')?.remove()
    document.getElementsByClassName('e1')[0]?.remove()
    document.getElementById('content')?.style.setProperty('float', 'none')
    document.querySelector('head > style')?.remove()

    const container = document.getElementById('container')!
    container.insertAdjacentHTML('beforebegin', login)

    const loginBtn = document.getElementById('loginBtn')!
    const loginPopover = document.getElementById('loginPopover')!

    loginBtn.addEventListener('click', () => {
      loginPopover.style.display = loginPopover.style.display === 'none' ? 'block' : 'none'
    })
  })
}
