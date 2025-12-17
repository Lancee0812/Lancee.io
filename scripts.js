// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');
    let lastScrollTop = 0; // 记录上一次滚动位置
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏背景变化 - 基于滚动方向判断
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // 向下滚动且超过阈值，显示scrolled状态
            navbar.classList.add('scrolled');
        } else if (scrollTop < lastScrollTop) {
            // 向上滚动，隐藏scrolled状态
            navbar.classList.remove('scrolled');
        }
        
        // 更新上一次滚动位置
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 防止负值
        
        // 进度条更新
        updateProgressBar();
        
        // 检查元素是否进入视口，添加动画效果
        checkScroll();
    });
    
    // 更新进度条
    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    // 初始化进度条
    updateProgressBar();
    
    // 作品筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的active状态
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 筛选作品项
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // 添加淡入动画
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.5s ease';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 作品项点击事件
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // 这里可以添加打开作品详情的逻辑
            const title = this.querySelector('h3').textContent;
            alert(`查看作品: ${title}`);
            // 实际项目中可以实现更复杂的详情展示模态框
        });
    });
    
    // 滚动动画设置
    const animatedElements = document.querySelectorAll('.section-title, .fursona-details, .portfolio-item, .about-text');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始化动画元素样式
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 立即检查一次，确保首屏元素可见
    checkScroll();
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
            const navbarHeight = navbar.offsetHeight; // 动态获取导航栏实际高度
            
            if (targetElement) {
                // 检查是否向下滚动
                if (targetElement.offsetTop > currentScrollPos) {
                    // 向下滚动时，不考虑导航栏高度（因为导航栏会隐藏）
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // 向上滚动时，考虑导航栏高度
                    window.scrollTo({
                        top: targetElement.offsetTop - navbarHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 按钮悬停效果增强（已在CSS中实现基本效果，这里可以添加额外的JS交互）
    // 为按钮添加按下效果 - 不使用内联样式避免覆盖CSS hover
    const buttons = document.querySelectorAll('.btn, .filter-btn, .pagination-btn, .social-link');
    
    buttons.forEach(button => {
        // 添加鼠标按下效果
        button.addEventListener('mousedown', function() {
            this.classList.add('btn-pressed');
        });
        
        // 移除按下效果
        function removePressed() {
            this.classList.remove('btn-pressed');
        }
        
        button.addEventListener('mouseup', removePressed);
        button.addEventListener('mouseleave', removePressed);
    });
    
    // 实现图片懒加载效果
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                    
                    // 添加淡入效果
                    image.style.opacity = '0';
                    image.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        image.style.opacity = '1';
                    }, 100);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // 回退方案
        lazyImages.forEach(image => {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        });
    }
    
    // 为图片添加点击放大效果
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // 这里可以实现图片放大预览功能
            // 在实际项目中，可以使用lightbox或自定义模态框
            this.classList.toggle('expanded');
            
            if (this.classList.contains('expanded')) {
                this.style.position = 'relative';
                this.style.zIndex = '1000';
                this.style.transform = 'scale(1.2)';
                this.style.transition = 'transform 0.3s ease';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            } else {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'var(--shadow-light)';
                setTimeout(() => {
                    this.style.position = 'static';
                    this.style.zIndex = '1';
                }, 300);
            }
        });
    });
    
    // 响应式菜单处理（在小屏幕上可能需要）
    // 这里为未来的移动端菜单扩展预留了接口
    
    // 页面加载完成后的欢迎效果
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        // 启动名字打字动画
        startNameTypingAnimation();
    }, 300);
    
    // 实现名字打字动画：字母逐个显示，i之后同时出现'和x
    function startNameTypingAnimation() {
        const nameElement = document.getElementById('name-typing');
        // 精确的逐字符打字序列：n → na → nai → nai' → nai'x → nai'xi → 奶 → 奶昔
        const typingSequence = ['n', 'na', 'nai', "nai'x", "nai'xi", '奶昔'];
        let currentIndex = 0;
        
        // 设置初始状态
        nameElement.textContent = '';
        
        // 开始逐字符打字动画
        setTimeout(() => {
            function typeNext() {
                if (currentIndex < typingSequence.length) {
                    nameElement.textContent = typingSequence[currentIndex];
                    currentIndex++;
                    
                    // 设置不同阶段的打字速度
                    let delay = 300; // 默认打字速度
                    if (currentIndex === typingSequence.length - 1) {
                        delay = 600; // 在切换到中文前稍微停顿
                    }
                    
                    setTimeout(typeNext, delay);
                } else {
                    // 打字动画完成后调用回调函数
                    onTypingAnimationComplete();
                }
            }
            
            typeNext(); // 开始打字动画
        }, 500); // 等待500毫秒后开始动画
    }
    
    // 打字动画完成后的回调函数
    function onTypingAnimationComplete() {
        // 延迟200毫秒后显示"不是小饮料！"，让名字显示稳定
        setTimeout(() => {
            showPlayfulText();
        }, 500);
    }
    
    // 显示"不是小饮料！"并添加动画效果
    function showPlayfulText() {
        const playfulText = document.querySelector('.playful-text');
        if (playfulText) {
            playfulText.classList.add('show');
        }
    }
    
    // Fursona特性突出显示
    const characteristics = document.querySelectorAll('.characteristic');
    
    characteristics.forEach((char, index) => {
        char.addEventListener('mouseenter', function() {
            // 可以为不同特性添加独特的强调效果
            this.style.backgroundColor = `rgba(42, 157, 143, ${0.05 + index * 0.05})`;
            this.style.borderRadius = 'var(--border-radius-small)';
            this.style.padding = 'var(--spacing-md)';
            this.style.transition = 'all 0.3s ease';
        });
        
        char.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
        });
    });
    
    // 回到顶部按钮功能
    const backToTopBtn = document.getElementById('back-to-top');
    
    // 滚动检测
    window.addEventListener('scroll', () => {
        const heroHeight = document.getElementById('hero').offsetHeight;
        // 当滚动超过hero区域时显示按钮
        if (window.pageYOffset > heroHeight) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击事件
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 统计页面访问信息（简单实现）
    function trackPageView() {
        console.log('页面访问已记录');
        // 在实际项目中可以集成分析工具
    }
    
    // 调用页面访问统计
    trackPageView();

    // 联系图片切换功能
    const socialLinks = document.querySelectorAll('.social-link');
    const currentImage = document.getElementById('currentImage');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // 移除所有链接的active类
            socialLinks.forEach(l => l.classList.remove('active'));
            // 添加当前链接的active类
            this.classList.add('active');
            
            // 获取当前链接的数据属性
            const imageUrl = this.getAttribute('data-image');
            const imageAlt = this.getAttribute('data-alt');
            
            // 更新显示的图片
            currentImage.style.opacity = '0';
            setTimeout(() => {
                currentImage.src = imageUrl;
                currentImage.alt = imageAlt;
                currentImage.style.opacity = '1';
            }, 300);
        });
    });
});
