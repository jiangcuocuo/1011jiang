// 宠物状态
const petState = {
    hunger: 80,
    happiness: 75,
    energy: 60,
    isSleeping: false
};

// DOM元素
const petDisplay = document.getElementById('pet-display');
const messageBox = document.getElementById('message-box');
const hungerBar = document.getElementById('hunger-bar');
const happinessBar = document.getElementById('happiness-bar');
const energyBar = document.getElementById('energy-bar');
const hungerValue = document.getElementById('hunger-value');
const happinessValue = document.getElementById('happiness-value');
const energyValue = document.getElementById('energy-value');
const feedBtn = document.getElementById('feed-btn');
const playBtn = document.getElementById('play-btn');
const sleepBtn = document.getElementById('sleep-btn');

// 渲染像素猫
function renderCat() {
    petDisplay.innerHTML = `
        <div class="pixel-cat" id="pixel-cat">
            <div class="cat-ear-left"></div>
            <div class="cat-ear-right"></div>
            <div class="cat-head">
                <div class="cat-eye-left"></div>
                <div class="cat-eye-right"></div>
                <div class="cat-nose"></div>
                <div class="cat-mouth" id="cat-mouth"></div>
            </div>
        </div>
    `;
}

// 更新状态显示
function updateStatsDisplay() {
    hungerBar.style.width = petState.hunger + '%';
    happinessBar.style.width = petState.happiness + '%';
    energyBar.style.width = petState.energy + '%';
    
    hungerValue.textContent = petState.hunger + '%';
    happinessValue.textContent = petState.happiness + '%';
    energyValue.textContent = petState.energy + '%';
    
    // 根据心情更新嘴巴形状
    const catMouth = document.getElementById('cat-mouth');
    if (catMouth) {
        if (petState.happiness > 70) {
            catMouth.style.borderRadius = '50%';
            catMouth.style.height = '20px';
        } else if (petState.hunger > 70) {
            catMouth.style.borderRadius = '0 0 20px 20px';
            catMouth.style.height = '15px';
        }
    }
}

// 显示消息
function showMessage(message) {
    messageBox.textContent = message;
}

// 喂食
function feed() {
    if (petState.isSleeping) {
        showMessage('Zzz... 小猫正在睡觉');
        return;
    }
    
    petState.hunger = Math.max(0, petState.hunger - 20);
    petState.happiness = Math.min(100, petState.happiness + 10);
    
    updateStatsDisplay();
    showMessage('喵呜~ 好吃！');
    
    // 添加吃东西动画
    const cat = document.getElementById('pixel-cat');
    if (cat) {
        cat.classList.add('eat');
        setTimeout(() => {
            cat.classList.remove('eat');
        }, 500);
    }
}

// 玩耍
function play() {
    if (petState.isSleeping) {
        showMessage('Zzz... 小猫正在睡觉');
        return;
    }
    
    if (petState.energy < 20) {
        showMessage('喵... 我太累了玩不动了');
        return;
    }
    
    petState.happiness = Math.min(100, petState.happiness + 15);
    petState.energy = Math.max(0, petState.energy - 15);
    petState.hunger = Math.min(100, petState.hunger + 10);
    
    updateStatsDisplay();
    showMessage('喵喵！真好玩！');
    
    // 添加弹跳动画
    const cat = document.getElementById('pixel-cat');
    if (cat) {
        cat.classList.add('bounce');
        setTimeout(() => {
            cat.classList.remove('bounce');
        }, 1000);
    }
}

// 睡觉
function sleep() {
    if (petState.isSleeping) {
        // 唤醒
        petState.isSleeping = false;
        petState.energy = Math.min(100, petState.energy + 40);
        updateStatsDisplay();
        showMessage('喵~ 我睡醒啦！');
        
        const cat = document.getElementById('pixel-cat');
        if (cat) {
            cat.classList.remove('sleep');
        }
        
        sleepBtn.innerHTML = '<i class="fas fa-bed"></i><span>睡觉</span>';
    } else {
        // 睡觉
        petState.isSleeping = true;
        showMessage('Zzz... 小猫睡着了');
        
        const cat = document.getElementById('pixel-cat');
        if (cat) {
            cat.classList.add('sleep');
        }
        
        sleepBtn.innerHTML = '<i class="fas fa-sun"></i><span>唤醒</span>';
    }
}

// 随时间变化的状态
function updateStateOverTime() {
    if (!petState.isSleeping) {
        petState.hunger = Math.min(100, petState.hunger + 2);
        petState.happiness = Math.max(0, petState.happiness - 1);
        petState.energy = Math.max(0, petState.energy - 1);
    } else {
        petState.energy = Math.min(100, petState.energy + 3);
    }
    
    // 低状态警告
    if (petState.hunger > 80 && !petState.isSleeping) {
        showMessage('喵... 我饿了');
    } else if (petState.happiness < 30 && !petState.isSleeping) {
        showMessage('喵~ 陪我玩嘛');
    } else if (petState.energy < 20 && !petState.isSleeping) {
        showMessage('喵... 我想睡觉了');
    }
    
    updateStatsDisplay();
}

// 初始化
function init() {
    renderCat();
    updateStatsDisplay();
    showMessage('欢迎照顾你的像素小猫！');
    
    // 添加事件监听
    feedBtn.addEventListener('click', feed);
    playBtn.addEventListener('click', play);
    sleepBtn.addEventListener('click', sleep);
    
    // 每10秒更新一次状态
    setInterval(updateStateOverTime, 10000);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);