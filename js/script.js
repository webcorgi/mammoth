$(function () {
    // 함수 실행
    handleLoader();
    mainVisualSlider()
    mainGamesSlider()
    clickNav()
    activePopup()
    clickTableTr()
    circleProgressbar()
    wheelAction()
    activeBtnCategory()
    activePopupMember()
    amountButton()
    btnHeadPopupMobile()
    mainRealTimeTab()
    languageSelect()
    loginBeforeBodyMarginTop()
    loginPopupClose()
    loginPopupForSignup()
    loginPopupForSignupEnd()

    $(window).resize(function(){
        loginBeforeBodyMarginTop()
    })

    
    positionLoginPopups()
    $(window).resize(function() {
        positionLoginPopups();
    });
})

function mainVisualSlider() {
    var swiper = new Swiper(".main__visualslider", {
        slidesPerView: 1,
        autoplay:{
            delay: 300000,
        },
        loop:true,
        pagination: {
            el: '.swiper-pagination', // 페이지네이션 요소의 CSS 선택자
            clickable: true,          // 페이지네이션 버튼 클릭 가능 여부
            type: 'bullets',          // 페이지네이션 유형 ('bullets', 'fraction', 'progressbar', 'custom')
        },
    });
}

function mainGamesSlider() {
    var swiper = new Swiper(".main__gamesslider", {
        slidesPerView: 5,
        spaceBetween: 14,
        autoplay:{
            delay: 3000,
        },
        loop:true,
        breakpoints:{
            1024:{
                slidesPerView:5,
                spaceBetween: 14,
            },
            767:{
                slidesPerView:2,
                spaceBetween:5,
            },
            320:{
                slidesPerView:2,
                spaceBetween:5,
            }
        },
    });
}

function clickNav(){
    const $nav = $('nav').eq(0)
    $('.btn-menu').on('click', function(){
        $nav.toggleClass('active')
        $(this).toggleClass('active')
        if( $nav.hasClass('active') ){
            $('header').addClass('active')
        }else{
            $('header').removeClass('active')
        }
    })

    $('.nav-close-btn').on('click', function(){
        $nav.removeClass('active')
        $('header').removeClass('active')
        $('.btn-menu').removeClass('active')
    })
}

function changeWalletType(type){
    let idx = type==='deposit' ? 0 : 1
    $('.popup .firstTab button').eq(idx).addClass('active').siblings().removeClass('active')
    $('.popup__divider>div').removeClass('active').eq(idx).addClass('active')
}

function activePopup(){
    $('.aside__wallet').on('click', function(){
        showWallet()
    })
    $('.btn-deposit').on('click', function(){
        showWallet('deposit')
    })
    $('.btn-withdrawal').on('click', function(){
        showWallet('withdrawal')
    })

    function showWallet(type){
        $('.popup.wallet').css({display:'flex'})
        let idx = 0;
        if( type==='deposit' ){
            idx = 0
        }else if( type==='withdrawal' ){
            idx = 1
        }
        $('.popup .firstTab button').eq(idx).addClass('active').siblings().removeClass('active')
        $('.popup__divider>div').removeClass('active').eq(idx).addClass('active')
    }
    /* close */
    $('.popup .btn-close, .popup .bg').on('click', function(){
        $('.popup').hide()
    })

}

function clickTableTr(){
    $('.mypage__table .tr_top').on('click', function(){
        const $this = $(this)
        if( $this.hasClass('active') ){
            $this.removeClass('active')
        }else{
            $('.mypage__table .tr_top').removeClass('active')
            $this.addClass('active')
        }
    })
}


function circleProgressbar(){
    if( !$('.progress-bar').length ) return;
    const circle = document.querySelector('.progress-bar');
    const valueDisplay = document.querySelector('#progress-value');
    const maxValue = document.querySelector('#progress-value-default');
    const circumference = 2 * Math.PI * 70; // 원의 둘레 계산

    circle.style.strokeDasharray = circumference;
    
    function setProgress() {
        const currentValue = parseInt(valueDisplay.getAttribute('data-nowValue')) || 0;
        const maxNum = parseInt(maxValue.textContent) || 100000;
        const percent = (currentValue / maxNum) * 100;
        
        const offset = circumference - (percent / 100 * circumference);
        circle.style.strokeDashoffset = offset;
        
        // 숫자 표시 업데이트
        valueDisplay.textContent = currentValue.toLocaleString();
        maxValue.textContent = maxNum.toLocaleString();
    }

    // 초기 실행
    setProgress();

    // data-nowValue 값이 변경될 때마다 업데이트하기 위한 Observer 설정
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-nowValue') {
                setProgress();
            }
        });
    });

    observer.observe(valueDisplay, {
        attributes: true,
        attributeFilter: ['data-nowValue']
    });
}

function wheelAction(){
    if(!$('.wheel_action').length) return
    const startButton = document.querySelector('.btn-spin.start');
    const centerImage = document.querySelector('.wheel-circle');
    let isSpinning = false;
    let currentRotation = 0;  // 현재 회전 각도를 저장


    function start(){
        if (isSpinning) return;

        isSpinning = true;

        // 기본 회전 수 (9.5바퀴 = 3420도) + 랜덤 추가 회전 (0-359도)
        const additionalRotation = Math.floor(Math.random() * 360);
        const totalRotation = 3420 + additionalRotation;

        // 현재 각도에서 새로운 각도만큼 추가 회전
        currentRotation += totalRotation;

        // 애니메이션 적용
        centerImage.style.transition = 'transform 5s cubic-bezier(0.32, 0, 0.39, 1)';
        centerImage.style.transform = `rotate(${currentRotation}deg)`;

        // 애니메이션 완료 후 상태 초기화
        setTimeout(() => {
            isSpinning = false;
            // transition 제거 (다음 회전을 위해)
            centerImage.style.transition = 'none';
        }, 5000);
    }

    startButton.addEventListener('click', function() {
        start()
    });
}

function activeBtnCategory() {
    $('.btn-category').on('click', function() {
        $(this).toggleClass('active');
    });
}

function activePopupMember(){
    $('.btn-member.signup').on('click', function(){
        $('.popup.signup').css({display:'flex'})
    })
    $('.showSignupPopup').on('click', function(){
        $('.popup.signup').css({display:'flex'})
    })

    $('.btn-member.login').on('click', function(){
        $('.popup.login').css({display:'flex'})
    })


}

function popupBasicOpen(){
    $('.popup__basic').show()
}
function popupBasicClose(){
    $('.popup__basic').hide()
}

document.addEventListener('DOMContentLoaded', function() {
    const popupManager = {
        imagePopups: Array.from(document.querySelectorAll('.popup__image__cont')),
        textPopupContainer: document.querySelector('.popup__text__cont__container'),
        textPopups: Array.from(document.querySelectorAll('.popup__text__cont')),
        popupContainer: document.querySelector('.popup__container'),
        maxVisiblePopups: window.innerWidth > 991 ? 3 : 1,
        activeImagePopups: [],
        activeTextPopups: [],
        isTextPopupPhase: false,

        init() {
            // 팝업 컨테이너가 존재하는지 확인
            if (!this.popupContainer) {
                console.warn('Popup container not found.');
                return;
            }

            // 초기화 순서 변경
            this.bindEvents();
            this.checkCookieStatus();
            this.showInitialPopups();
        },

        checkCookieStatus() {
            this.imagePopups.forEach(popup => {
                const popupId = popup.dataset.popupId;
                if (popupId && this.getCookie(`popup_${popupId}`) === 'closed') {
                    popup.style.display = 'none';
                    popup.classList.add('closed');
                }
            });

            this.textPopups.forEach(popup => {
                const popupId = popup.dataset.popupId;
                if (popupId && this.getCookie(`popup_${popupId}`) === 'closed') {
                    popup.style.display = 'none';
                    popup.classList.add('closed');
                }
            });

            const allImagesClosed = this.imagePopups.every(popup => popup.classList.contains('closed'));
            if (allImagesClosed) {
                this.isTextPopupPhase = true;
                if (this.textPopups.every(popup => popup.classList.contains('closed'))) {
                    this.closeAllPopups();
                }
            }
        },

        setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
        },

        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
            return null;
        },

        bindEvents() {
            // 이벤트 위임을 사용하여 팝업 컨테이너에 이벤트 리스너 추가
            if (!this.popupContainer) return
            this.popupContainer.addEventListener('click', (e) => {
                // 닫기 버튼 클릭 처리
                if (e.target.closest('.popup-close')) {
                    e.preventDefault();
                    e.stopPropagation();
                    const popup = e.target.closest('.popup__image__cont, .popup__text__cont');
                    if (popup) {
                        this.handlePopupClose(popup);
                    }
                }

                // 오늘 하루 닫기 버튼 클릭 처리
                if (e.target.closest('.btn-todayclose')) {
                    e.preventDefault();
                    e.stopPropagation();
                    const popup = e.target.closest('.popup__image__cont, .popup__text__cont');
                    if (popup) {
                        this.handleTodayClose(popup);
                    }
                }
            });

            // 리사이즈 이벤트
            window.addEventListener('resize', () => {
                const newMaxVisible = window.innerWidth > 991 ? 3 : 1;
                if (newMaxVisible !== this.maxVisiblePopups) {
                    this.maxVisiblePopups = newMaxVisible;
                    this.updateVisiblePopups();
                }
            });
        },

        showInitialPopups() {
            const hasVisiblePopups = this.imagePopups.some(popup => !popup.classList.contains('closed')) ||
                                   this.textPopups.some(popup => !popup.classList.contains('closed'));
            
            if (!hasVisiblePopups) {
                this.popupContainer.style.display = 'none';
                return;
            }
            
            this.popupContainer.style.display = 'flex';
            this.updateVisiblePopups();
        },

        updateVisiblePopups() {
            if (!this.isTextPopupPhase) {
                const remainingImages = this.imagePopups.filter(popup => !popup.classList.contains('closed'));
                this.activeImagePopups = remainingImages.slice(0, this.maxVisiblePopups);
                
                this.imagePopups.forEach(popup => {
                    popup.style.display = this.activeImagePopups.includes(popup) ? 'block' : 'none';
                });

                if (remainingImages.length === 0) {
                    this.isTextPopupPhase = true;
                    this.showTextPopups();
                }
            } else {
                this.showTextPopups();
            }
        },

        showTextPopups() {
            if (this.textPopupContainer && this.textPopups.length > 0) {
                this.textPopupContainer.style.display = 'block';
                
                const remainingTexts = this.textPopups.filter(popup => !popup.classList.contains('closed'));
                this.activeTextPopups = remainingTexts.slice(0, this.maxVisiblePopups);
                
                this.textPopups.forEach(popup => {
                    popup.style.display = this.activeTextPopups.includes(popup) ? 'block' : 'none';
                });

                if (remainingTexts.length === 0) {
                    this.closeAllPopups();
                }
            } else {
                this.closeAllPopups();
            }
        },

        handlePopupClose(popup) {
            if (!popup || popup.classList.contains('closed')) return;
            
            popup.classList.add('closed');
            popup.style.display = 'none';
            this.updateVisiblePopups();
        },

        handleTodayClose(popup) {
            if (!popup || popup.classList.contains('closed')) return;
            
            const popupId = popup.dataset.popupId;
            if (popupId) {
                this.setCookie(`popup_${popupId}`, 'closed', 1);
            }
            this.handlePopupClose(popup);
        },

        closeAllPopups() {
            this.popupContainer.style.display = 'none';
        }
    };

    // 팝업 매니저 초기화
    popupManager.init();
});

// 로딩 화면을 제어하는 함수
function handleLoader() {
    const loaderWrap = document.querySelector('.loader__wrap');
    if (!loaderWrap) return;
    // 로딩 요소를 찾습니다
    
    // 3초(3000ms) 후에 로딩 화면을 사라지게 합니다
    setTimeout(function() {
        // 페이드 아웃 효과를 위한 클래스 추가
        loaderWrap.classList.add('fade-out');
        
        // 페이드 아웃 애니메이션 시간(0.5초) 후 완전히 제거
        setTimeout(function() {
            loaderWrap.style.display = 'none';
        }, 500);
    }, 5000);
}


function amountButton(){
    // Check if amount buttons exist on the page
    if ($('.amount-button').length > 0) {
        // Add click event handler to all amount buttons
        $('.amount-button').on('click', function() {
            // Get the data-value attribute from the clicked button
            const value = $(this).data('value');
            
            // If it's the reset button (정정하기) or value is 0
            if (value === 0) {
                // Clear the input
                $('.custom-amount-input').val('');
            } else {
                // Set the input value to the button's data-value
                $('.custom-amount-input').val(value);
            }
            
            // Remove 'active' class from all buttons and add it to the clicked one
            $('.amount-button').removeClass('active');
            $(this).addClass('active');
        });
    }
}

function btnHeadPopupMobile(){
    $('.btn-head-mypage-mobile').on('click', function(event){
        $('.head-mypage-popup').toggleClass('active');
        event.stopPropagation(); // Prevent this click from being caught by the document handler
    });

    $(document).on('click', function(event){
        if (!$(event.target).closest('.head-mypage-popup').length) {
            $('.head-mypage-popup').removeClass('active');
        }
    });
}

function mainRealTimeTab(){
    $('.realtimeboard .tab button').on('click', function(){
        const $this = $(this)
        const idx = $this.index()
        $this.addClass('active').siblings().removeClass('active')
        $('.realtime__tab__content>div').eq(idx).addClass('active').siblings().removeClass('active')
    })
}

function languageSelect(){
    if(!$('select#languageSelect').length) return
    const languageSelect = document.getElementById('languageSelect');
    const languageFlag = document.getElementById('languageFlag');
    
    // Change flag when language is changed
    languageSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const flagSrc = selectedOption.getAttribute('data-flag');
        
        if (flagSrc) {
        languageFlag.src = flagSrc;
        languageFlag.alt = selectedOption.text + ' Flag';
        }
    });
}

function loginBeforeBodyMarginTop() {
    if ($('.before__login').length && $(window).width() <= 768) {
        $('body').css({marginTop:60});
    }else{
        $('body').css({marginTop:0});
    }
}




function loginPopupClose(){
    if( !$('.popup__login').length ) return;
    $('.popup__login').each(function(){
        $(this).find('img, .bg').on('click', function(){
            $(this).closest('.popup__login').hide()
        })
    })
}

function loginPopupForSignup(){
    $('.popup__signup').find('.btn-close, .popup__signup__bg').on('click', function(){
        $('.popup__signup').hide()
    })

    $('.btn-signup').on('click', function(){
        $('.popup__signup').css({display:'flex'})
    });

    $('.btn-btm-signup').on('click', function(){
        $('.popup__signup').css({display:'none'})
        $('.popup__signupend').css({display:'flex'})
    });
}

function loginPopupForSignupEnd(){
    $('.popup__signupend').find('.btn-close, .popup__signupend__bg').on('click', function(){
        $('.popup__signupend').hide()
    })
}



function positionLoginPopups() {
    if( !$('.login__container').length ) return;

    if( $(window).width() > 991 ){
        const containerLeft = $('.login__container').offset().left;
        $('.popup__login.left').css({left:containerLeft+564+30})
        $('.popup__login.right').css({right:containerLeft+564+30})
    }else{
        const containerLeft = $('.login__container').offset().left;
        $('.popup__login.left').css({left:0})
        $('.popup__login.right').css({right:0})
    }

}