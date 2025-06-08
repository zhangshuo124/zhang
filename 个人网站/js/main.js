document.addEventListener('DOMContentLoaded', () => {
  // 导航栏滚动效果
  const header = document.querySelector('header');
  const scrollWatcher = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', scrollWatcher);

  // 移动端导航菜单切换
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // 点击导航链接时关闭移动菜单
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // 滚动动画
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // 初始运行一次

  // 技能进度条动画
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const animateSkills = () => {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      bar.style.width = percentage + '%';
    });
  };

  // 在"技能"部分可见时激活技能进度条
  const skillsSection = document.querySelector('#skills');
  
  const checkSkills = () => {
    if (skillsSection) {
      const sectionTop = skillsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight - 100) {
        animateSkills();
        window.removeEventListener('scroll', checkSkills);
      }
    }
  };
  
  window.addEventListener('scroll', checkSkills);
  
  // 表单验证
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formInputs = this.querySelectorAll('.form-control');
      
      formInputs.forEach(input => {
        if (input.value.trim() === '') {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (isValid) {
        // 在这里可以添加表单提交代码
        // 这里仅模拟表单提交成功
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = '正在发送...';
        
        setTimeout(() => {
          this.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          // 显示成功消息
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.textContent = '消息已成功发送！';
          this.appendChild(successMessage);
          
          // 3秒后移除成功消息
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }, 1500);
      }
    });
    
    // 输入时移除错误状态
    contactForm.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', function() {
        this.classList.remove('error');
      });
    });
  }
  
  // 模态框功能
  const modalOpenBtns = document.querySelectorAll('[data-modal]');
  const modalCloseBtns = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal');
  
  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
      }
    });
  });
  
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      
      if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
      }
    });
  });
  
  // 点击模态框背景关闭模态框
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
      }
    });
  });

  // 项目筛选功能
  const projectFilterBtns = document.querySelectorAll('#project-filter .filter-btn');
  const projectItems = document.querySelectorAll('.project-card');
  
  if (projectFilterBtns.length > 0 && projectItems.length > 0) {
    projectFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 移除所有按钮的active类
        projectFilterBtns.forEach(b => b.classList.remove('active'));
        // 添加当前按钮的active类
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectItems.forEach(item => {
          const categories = item.getAttribute('data-category');
          
          if (filter === 'all' || categories.includes(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 摄影作品筛选功能
  const photoFilterBtns = document.querySelectorAll('#photo-filter .filter-btn');
  const photoItems = document.querySelectorAll('.gallery-item');
  
  if (photoFilterBtns.length > 0 && photoItems.length > 0) {
    photoFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 移除所有按钮的active类
        photoFilterBtns.forEach(b => b.classList.remove('active'));
        // 添加当前按钮的active类
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        photoItems.forEach(item => {
          const categories = item.getAttribute('data-category');
          
          if (filter === 'all' || categories.includes(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // FAQ 手风琴效果
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // 关闭其他打开的FAQ
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // 切换当前FAQ的active状态
        item.classList.toggle('active');
      });
    });
  }

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}); 