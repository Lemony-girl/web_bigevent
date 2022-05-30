$(function () {
  $('#link_reg').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').click(() => {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 引入form模块
  let form = layui.form
  let layer = layui.layer
  // 自定义校验规则
  form.verify({
    // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 确认密码校验规则
    repwd: (value) => {
      // 获取当前输入框的值和密码框的值，进行判断
      const pwd = $('#form_reg [name=password]').val()
      if (pwd !== value) return '两次密码不一致';
    }
  })
  // 根路径
  // const baseUrl = 'http://www.liulongbin.top:3007'
  // 注册功能
  $('#form_reg').on('submit', (e) => {
    // 阻止默认提交事件
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg('注册失败')
        layer.msg('注册成功')
        // 模拟点击跳转登录
        $('#link_login').click()
      }
    })
  })
  // 登录功能
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('登录失败')
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    })
  })
})