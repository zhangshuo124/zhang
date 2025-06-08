// 现代网站JavaScript功能实现

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('.main-header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 移动端菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // 添加汉堡按钮动画
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // 滚动显示元素动画
    const animateElements = document.querySelectorAll('.animate');
    
    // 初始检查哪些元素应该显示
    checkAnimationElements();
    
    // 滚动时检查哪些元素应该显示
    window.addEventListener('scroll', checkAnimationElements);
    
    function checkAnimationElements() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }
    
    // 数字增长动画
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statsSection = document.getElementById('stats');
        if (!statsSection) return;
        
        const statsSectionTop = statsSection.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (statsSectionTop < triggerBottom) {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 动画持续时间（毫秒）
                const increment = target / (duration / 16); // 每16毫秒的增量
                
                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        stat.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCount();
            });
            
            statsAnimated = true;
        }
    }
    
    // 滚动时检查是否应该开始数字动画
    window.addEventListener('scroll', animateStats);
    
    // 滚动到顶部按钮
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(targetId);
            if (target) {
                // 如果是移动导航菜单，点击后关闭菜单
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 页面加载动画
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // 显示首屏元素
        document.querySelectorAll('.hero-modern .animate').forEach(element => {
            element.classList.add('visible');
        });
    }, 200);
    
    // 添加视差滚动效果
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        
        // 为背景图形添加视差效果
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // 为图片添加加载过渡效果
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // 如果图片已经加载完成
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
    
    // 为页面添加一些随机的光效
    function createLightEffect() {
        const hero = document.querySelector('.hero-modern');
        if (!hero) return;
        
        const light = document.createElement('div');
        light.classList.add('light-effect');
        
        // 随机位置
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // 随机大小
        const size = Math.random() * 200 + 50;
        
        // 随机颜色
        const colors = ['rgba(53, 80, 255, 0.2)', 'rgba(255, 43, 81, 0.2)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        light.style.left = `${posX}%`;
        light.style.top = `${posY}%`;
        light.style.width = `${size}px`;
        light.style.height = `${size}px`;
        light.style.backgroundColor = color;
        
        hero.appendChild(light);
        
        // 一段时间后移除
        setTimeout(() => {
            light.remove();
        }, 5000);
    }
    
    // 定期创建光效
    setInterval(createLightEffect, 3000);
    
    // 添加CSS动态样式
    const style = document.createElement('style');
    style.textContent = `
        .light-effect {
            position: absolute;
            border-radius: 50%;
            filter: blur(50px);
            opacity: 0;
            z-index: 0;
            animation: lightFade 5s ease-in-out;
        }
        
        @keyframes lightFade {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 0.5; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.2); }
        }
        
        img.loaded {
            animation: imgFadeIn 0.5s ease-in-out;
        }
        
        @keyframes imgFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        body.loaded {
            animation: pageTransition 0.5s ease-in-out;
        }
        
        @keyframes pageTransition {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
}); 