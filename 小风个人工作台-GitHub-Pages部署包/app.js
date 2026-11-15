(() => {
    'use strict';

    const INITIAL_CONFIG = window.WORKBENCH_CONFIG;
    // 图标路径来自 @tabler/icons 3.46.0，保持单文件离线可用。
    const ICONS = {
      home: '<path d="M5 12l-2 0l9 -9l9 9l-2 0"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/><path d="M10 12h4v4h-4z"/>',
      today: '<path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6"/><path d="M16 3v4M8 3v4M4 11h16"/><path d="M15 19l2 2l4 -4"/>',
      inbox: '<path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/><path d="M4 13h3l3 3h4l3 -3h3"/>',
      content: '<path d="M4 4h6M14 4h6"/><path d="M4 10a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/><path d="M14 10a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/>',
      skills: '<path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6"/>',
      review: '<path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18"/><path d="M13 8h2M13 12h2"/>',
      settings: '<path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>',
      check: '<path d="M9 11l3 3l8 -8"/><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"/>',
      bulb: '<path d="M3 12h1M12 3v1M20 12h1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7"/><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3"/><path d="M9.7 17h4.6"/>',
      hourglass: '<path d="M6.5 7h11M6.5 17h11"/><path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1"/>',
      copy: '<path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"/><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"/>',
      install: '<path d="M12 3v12"/><path d="M8 11l4 4l4 -4"/><path d="M5 21h14a2 2 0 0 0 2 -2v-3M3 16v3a2 2 0 0 0 2 2"/>',
      wifi: '<path d="M12 18h.01M9.172 15.172a4 4 0 0 1 5.656 0M6.343 12.343a8 8 0 0 1 11.314 0M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"/>',
      arrowLeft: '<path d="M5 12h14M5 12l6 6M5 12l6 -6"/>',
      arrowRight: '<path d="M5 12h14M13 18l6 -6M13 6l6 6"/>',
      chevronUp: '<path d="M6 15l6 -6l6 6"/>',
      chevronDown: '<path d="M6 9l6 6l6 -6"/>'
    };
    const iconMarkup = name => `<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.sparkles}</svg>`;
    function iconNode(name, className) {
      const node = create('span', className || '');
      node.innerHTML = iconMarkup(name);
      return node;
    }
    const MODULE_META = {
      home: { label: '首页', title: '个人工作台', kicker: '属于你的生活与工作中心', icon: 'home', color: '#df7440', bg: '#f6dfca' },
      today: { label: '今日', title: '今天要做什么', kicker: '只留下真正重要的事', icon: 'today', color: '#547b70', bg: '#dcece6' },
      inbox: { label: '收件箱', title: '灵感收件箱', kicker: '先收下来，再决定去哪', icon: 'inbox', color: '#6e7769', bg: '#e8ebdf' },
      content: { label: '内容', title: '内容生产看板', kicker: '让每一个想法看见进度', icon: 'content', color: '#b26a3d', bg: '#efe0c2' },
      skills: { label: 'Skills', title: 'Skill 地图', kicker: '你的 AI 能力工具箱', icon: 'skills', color: '#658477', bg: '#dfece7' },
      review: { label: '复盘', title: '每日复盘', kicker: '把今天好好收起来', icon: 'review', color: '#8c735e', bg: '#eee4d7' },
      settings: { label: '设置', title: '个性化与数据', kicker: '让工作台真正像你', icon: 'settings', color: '#77766f', bg: '#eceae4' }
    };
    const MODULE_IDS = ['home', 'today', 'inbox', 'content', 'skills', 'review'];
    const CONTENT_STAGES = [
      { id: 'ideas', label: '灵感' }, { id: 'research', label: '待研究' },
      { id: 'drafting', label: '创作中' }, { id: 'review', label: '待发布' },
      { id: 'published', label: '已发布' }
    ];
    const TYPE_LABELS = { task: '任务', idea: '选题', spark: '灵感', resource: '资料', pending: '待确认' };
    const STORAGE_KEY = 'xindao-personal-workbench-v1:' + (INITIAL_CONFIG.instanceId || INITIAL_CONFIG.title);

    const $ = (selector, root = document) => root.querySelector(selector);
    const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const nowISO = () => new Date().toISOString();
    const localDateKey = value => {
      if (!value) return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '';
      const offset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() - offset).toISOString().slice(0, 10);
    };
    const todayKey = () => localDateKey(new Date());
    const formatDate = (value, options = {}) => new Intl.DateTimeFormat('zh-CN', options).format(new Date(value));

    function create(tag, className, text) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text !== undefined && text !== null) element.textContent = String(text);
      return element;
    }

    function makeButton(text, className, handler, label) {
      const button = create('button', 'button ' + (className || ''), text);
      button.type = 'button';
      if (label) button.setAttribute('aria-label', label);
      if (handler) button.addEventListener('click', handler);
      return button;
    }

    function defaultState() {
      return {
        version: 1,
        profile: { title: INITIAL_CONFIG.title, displayName: INITIAL_CONFIG.displayName, role: INITIAL_CONFIG.role },
        theme: INITIAL_CONFIG.theme || 'warm',
        enabledModules: INITIAL_CONFIG.modules || MODULE_IDS.slice(),
        moduleOrder: MODULE_IDS.slice(),
        tasks: [],
        captures: [],
        contents: [],
        skills: [],
        reviews: [],
        wallpaperPaused: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        dayStartedAt: null,
        updatedAt: nowISO()
      };
    }

    function hydrate(candidate) {
      const base = defaultState();
      if (!candidate || typeof candidate !== 'object') return base;
      return {
        ...base,
        ...candidate,
        profile: { ...base.profile, ...(candidate.profile || {}) },
        theme: ['warm', 'blue', 'mint'].includes(candidate.theme) ? candidate.theme : base.theme,
        wallpaperPaused: typeof candidate.wallpaperPaused === 'boolean' ? candidate.wallpaperPaused : base.wallpaperPaused,
        enabledModules: Array.isArray(candidate.enabledModules) ? candidate.enabledModules.filter(id => MODULE_IDS.includes(id)) : base.enabledModules,
        moduleOrder: Array.isArray(candidate.moduleOrder) ? candidate.moduleOrder.filter(id => MODULE_IDS.includes(id)) : base.moduleOrder,
        tasks: Array.isArray(candidate.tasks) ? candidate.tasks : base.tasks,
        captures: Array.isArray(candidate.captures) ? candidate.captures : base.captures,
        contents: Array.isArray(candidate.contents) ? candidate.contents : base.contents,
        skills: Array.isArray(candidate.skills) ? candidate.skills : base.skills,
        reviews: Array.isArray(candidate.reviews) ? candidate.reviews : base.reviews
      };
    }

    let storageUnavailable = false;
    function loadState() {
      try { return hydrate(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
      catch (_) { storageUnavailable = true; return defaultState(); }
    }

    let state = loadState();
    let currentView = 'home';
    let toastTimer;
    let deferredInstallPrompt = null;

    const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    const isIOSDevice = () => /iphone|ipad|ipod/i.test(navigator.userAgent);

    function installState() {
      if (!INITIAL_CONFIG.pwaEnabled) return { title: '当前是单文件备用版', detail: '它可以在电脑上双击使用，但不能作为 PWA 安装。请生成或打开软件版文件夹中的 index.html。', actionable: false };
      if (isStandalone()) return { title: '已经作为 App 运行', detail: '工作台已从桌面图标或独立窗口打开，数据仍只保存在当前设备。', actionable: false };
      if (deferredInstallPrompt) return { title: '可以安装到当前设备', detail: '点击“安装个人工作台”，浏览器会创建桌面图标和独立窗口。', actionable: true };
      if (isIOSDevice()) return { title: '在 Safari 中添加到主屏幕', detail: '点击 Safari 底部的分享按钮，再选择“添加到主屏幕”。完成后从桌面图标打开。', actionable: true };
      return { title: '当前作为网页运行', detail: '如果浏览器支持安装，安装入口会自动出现。也可以在浏览器菜单中查找“安装应用”或“添加到主屏幕”。', actionable: false };
    }

    function syncInstallUI() {
      const info = installState();
      const topButton = $('#install-app-button');
      if (topButton) topButton.classList.toggle('visible', info.actionable && !isStandalone());
      const settingsButton = $('#settings-install-button');
      if (settingsButton) {
        settingsButton.disabled = !info.actionable || isStandalone();
        settingsButton.textContent = isStandalone() ? '已经安装' : '安装个人工作台';
      }
      const title = $('#install-status-title');
      const detail = $('#install-status-detail');
      if (title) title.textContent = info.title;
      if (detail) detail.textContent = info.detail;
    }

    async function requestInstall() {
      if (!INITIAL_CONFIG.pwaEnabled) return toast('当前是单文件备用版，请打开软件版地址后安装');
      if (isStandalone()) return toast('已经作为 App 运行');
      if (isIOSDevice() && !deferredInstallPrompt) {
        showView('settings');
        syncInstallUI();
        return toast('请按设置页提示添加到主屏幕');
      }
      if (!deferredInstallPrompt) {
        showView('settings');
        syncInstallUI();
        return toast('请在浏览器菜单中选择安装应用');
      }
      const prompt = deferredInstallPrompt;
      deferredInstallPrompt = null;
      await prompt.prompt();
      const choice = await prompt.userChoice;
      toast(choice.outcome === 'accepted' ? '安装已确认' : '已取消安装');
      syncInstallUI();
    }

    function saveState() {
      state.updatedAt = nowISO();
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); storageUnavailable = false; }
      catch (_) { storageUnavailable = true; }
      window.__WORKBENCH_STATE__ = state;
      const warning = $('#storage-warning');
      if (warning) warning.hidden = !storageUnavailable;
    }

    function toast(message) {
      const element = $('#toast');
      element.textContent = message;
      element.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => element.classList.remove('show'), 2200);
    }

    function applyTheme() {
      document.documentElement.dataset.theme = state.theme;
      document.title = state.profile.title;
      $('#brand-title').textContent = state.profile.title;
    }

    function syncWallpaper() {
      const video = $('#wallpaper-video');
      const paused = Boolean(state.wallpaperPaused);
      const button = $('#wallpaper-toggle');
      button.setAttribute('aria-pressed', String(paused));
      button.setAttribute('aria-label', paused ? '播放动态壁纸' : '暂停动态壁纸');
      button.title = paused ? '播放动态壁纸' : '暂停动态壁纸';
      $('#wallpaper-toggle-label').textContent = paused ? '播放壁纸' : '暂停壁纸';
      $('#wallpaper-toggle-glyph').textContent = paused ? '▶' : 'Ⅱ';
      if (paused) video.pause();
      else {
        video.muted = true;
        const play = video.play();
        if (play && typeof play.catch === 'function') play.catch(() => {
          state.wallpaperPaused = true;
          saveState();
          syncWallpaper();
        });
      }
    }

    function todayTasks() {
      return state.tasks.filter(item => !item.done || localDateKey(item.completedAt) === todayKey());
    }

    function completedToday() {
      return state.tasks.filter(item => item.done && localDateKey(item.completedAt) === todayKey());
    }

    function dayHasStarted() {
      return localDateKey(state.dayStartedAt) === todayKey();
    }

    function visibleModules() {
      return state.moduleOrder.filter(id => state.enabledModules.includes(id));
    }

    function renderNav() {
      const nav = $('#nav');
      nav.replaceChildren();
      [...visibleModules(), 'settings'].forEach(id => {
        const meta = MODULE_META[id];
        const button = create('button', 'nav-button' + (currentView === id ? ' active' : ''));
        button.type = 'button';
        button.dataset.view = id;
        button.style.setProperty('--nav-color', meta.color);
        button.style.setProperty('--nav-bg', meta.bg);
        button.setAttribute('aria-current', currentView === id ? 'page' : 'false');
        button.append(iconNode(meta.icon, 'nav-icon'), create('span', '', meta.label));
        button.addEventListener('click', () => showView(id));
        nav.append(button);
      });
    }

    function showView(id) {
      if (id !== 'settings' && !state.enabledModules.includes(id)) id = 'home';
      currentView = id;
      const meta = MODULE_META[id];
      $('#view-title').textContent = id === 'home' ? state.profile.title : meta.title;
      $('#view-kicker').textContent = meta.kicker;
      $('#page-icon').innerHTML = iconMarkup(meta.icon);
      $('#page-icon').style.color = meta.color;
      $('#page-icon').style.background = meta.bg;
      renderNav();
      renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function renderCurrentView() {
      const root = $('#view-root');
      root.replaceChildren();
      const renders = { home: renderHome, today: renderToday, inbox: renderInbox, content: renderContent, skills: renderSkills, review: renderReview, settings: renderSettings };
      renders[currentView](root);
    }

    function panel(title, subtitle, wide = false) {
      const box = create('section', 'panel' + (wide ? ' wide' : ''));
      const head = create('div', 'panel-head');
      const copy = create('div');
      copy.append(create('h3', '', title));
      if (subtitle) copy.append(create('p', '', subtitle));
      head.append(copy);
      box.append(head);
      return { box, head };
    }

    function statCard(value, label, icon, colors) {
      const card = create('div', 'stat');
      if (colors) {
        card.style.setProperty('--stat-bg', colors[0]);
        card.style.setProperty('--stat-ink', colors[1]);
      }
      const copy = create('div');
      copy.append(create('div', 'stat-value', value), create('div', 'stat-label', label));
      card.append(iconNode(icon, 'stat-icon'), copy);
      return card;
    }

    function renderHome(root) {
      const hour = new Date().getHours();
      const greeting = hour < 11 ? '早上好' : hour < 18 ? '下午好' : '晚上好';
      const hero = create('section', 'hero');
      const copy = create('div', 'hero-copy');
      copy.append(create('div', 'eyebrow', state.profile.role));
      copy.append(create('h2', '', `${greeting}，${state.profile.displayName}`));
      copy.append(create('p', '', '先确认今天从哪里开始，再慢慢向前。学习、创作与灵感，都在这里接住。'));
      const goals = INITIAL_CONFIG.focusAreas || [];
      if (goals.length) copy.append(create('div', 'hero-goal', '长期目标 · ' + goals.join(' / ')));
      const focusBox = create('div', 'hero-focus');
      const note = create('div', 'focus-note');
      const nextTask = state.tasks.find(item => !item.done);
      const visibleTasks = todayTasks();
      const nextStep = nextTask ? nextTask.text : (visibleTasks.length ? '今天的重点已经完成' : '先确认今天的一件小事');
      note.append(iconNode('today', 'focus-note-icon'), create('small', '', '现在从这里开始'), create('strong', '', nextStep));
      focusBox.append(note);
      copy.append(focusBox);
      const heroActions = create('div', 'hero-actions');
      heroActions.append(makeButton('确认今日任务', 'primary', () => showView('today')), makeButton('填写每日复盘', 'soft', () => showView('review')));
      copy.append(heroActions);
      hero.append(copy);

      const done = completedToday().length;
      const activeContent = state.contents.filter(item => item.stage !== 'published').length;
      const reviewed = state.reviews.some(item => item.date === todayKey()) ? '已完成' : '待填写';
      const stats = create('section', 'stats');
      stats.append(
        statCard(`${done}/${visibleTasks.length}`, '今日任务', 'check', ['#d9e9f5', '#3d6887']),
        statCard(state.captures.length, '收件箱', 'bulb', ['#e3efea', '#587c70']),
        statCard(activeContent, '推进中的内容', 'hourglass', ['#f1e4c9', '#9b7040']),
        statCard(reviewed, '今日复盘', 'review', ['#eae6df', '#776e62'])
      );

      const grid = create('section', 'grid');
      const today = panel('今日三件事', '完成比堆满更重要');
      today.box.classList.add('home-today');
      const taskList = create('div', 'task-list');
      visibleTasks.slice().sort((a, b) => Number(a.done) - Number(b.done)).slice(0, 3).forEach(item => taskList.append(taskRow(item, true)));
      if (!visibleTasks.length) taskList.append(create('div', 'empty', '今天还没有任务，先选一件想推进的事'));
      today.box.append(taskList);
      today.head.append(makeButton('管理任务', 'small', () => showView('today')));

      const quick = panel('快速入口', '从下一步进入，不从工具开始');
      quick.box.classList.add('home-quick');
      const quickGrid = create('div', 'quick-grid');
      [
        ['bulb', '记一条灵感', '放进收件箱', 'inbox', '#e3efea', '#587c70'],
        ['content', '推进一篇内容', '打开生产看板', 'content', '#f1e4c9', '#9b7040'],
        ['skills', '找一个 Skill', '复制第一句调用', 'skills', '#f6dfca', '#b65c31'],
        ['review', '结束今天', '完成每日复盘', 'review', '#eae6df', '#776e62']
      ].forEach(([icon, title, desc, view, bg, ink]) => {
        const button = create('button', 'quick-card'); button.type = 'button';
        const iconWrap = iconNode(icon, 'quick-icon');
        iconWrap.style.setProperty('--quick-bg', bg);
        iconWrap.style.setProperty('--quick-ink', ink);
        button.append(iconWrap, create('strong', '', title), create('span', '', desc));
        button.addEventListener('click', () => showView(view)); quickGrid.append(button);
      });
      quick.box.append(quickGrid);

      const recent = panel('最近收集', '所有想法先落地，再决定去向', true);
      const captureList = create('div', 'capture-list');
      state.captures.slice(0, 4).forEach(item => captureList.append(captureRow(item, true)));
      if (!state.captures.length) captureList.append(create('div', 'empty', '收件箱还是空的，先记下一件刚刚想到的事'));
      recent.box.append(captureList);
      recent.head.append(makeButton('打开收件箱', 'small', () => showView('inbox')));
      grid.append(today.box, quick.box, recent.box);
      root.append(hero, stats, grid);
    }

    function taskRow(item, compact = false) {
      const row = create('div', 'task-item' + (item.done ? ' done' : ''));
      const check = create('input', 'task-check'); check.type = 'checkbox'; check.checked = Boolean(item.done); check.setAttribute('aria-label', `完成任务：${item.text}`);
      check.addEventListener('change', () => { item.done = check.checked; item.completedAt = check.checked ? nowISO() : null; saveState(); renderCurrentView(); });
      const copy = create('div', 'task-copy');
      copy.append(create('strong', '', item.text), create('span', '', `预计 ${Number(item.duration) || 0} 分钟`));
      row.append(check, copy);
      if (!compact) {
        const actions = create('div', 'item-actions');
        actions.append(makeButton('编辑', 'small', () => editTask(item)), makeButton('删除', 'small danger', () => deleteTask(item.id)));
        row.append(actions);
      }
      return row;
    }

    function editTask(item) {
      const text = window.prompt('修改任务', item.text);
      if (text === null) return;
      const cleaned = text.trim();
      if (!cleaned) return toast('任务不能为空');
      const duration = window.prompt('预计需要多少分钟？', String(item.duration || 30));
      item.text = cleaned; item.duration = Math.max(0, Number.parseInt(duration, 10) || 0); saveState(); renderCurrentView();
    }

    function deleteTask(id) {
      state.tasks = state.tasks.filter(item => item.id !== id); saveState(); renderCurrentView(); toast('任务已删除');
    }

    function renderToday(root) {
      const started = dayHasStarted();
      const progressPanel = panel('今日进度', started ? `开始于 ${formatDate(state.dayStartedAt, { hour: '2-digit', minute: '2-digit' })}` : '先定重点，再开始一天', true);
      const visibleTasks = todayTasks();
      const done = completedToday().length;
      const pending = state.tasks.filter(item => !item.done);
      const percentage = visibleTasks.length ? Math.round(done / visibleTasks.length * 100) : 0;
      const metrics = create('div', 'metric-strip');
      metrics.append(metric(done, '今日完成'), metric(pending.length, '待推进'), metric(pending.reduce((sum, item) => sum + (Number(item.duration) || 0), 0) + 'm', '剩余预计'));
      const bar = create('div', 'progress'); const fill = create('span'); fill.style.width = percentage + '%'; bar.append(fill);
      progressPanel.box.append(metrics, create('div', '', ''), bar);
      progressPanel.head.append(makeButton(started ? '进入复盘' : '开始今天', 'soft', () => {
        if (!dayHasStarted()) { state.dayStartedAt = nowISO(); saveState(); toast('今天开始了，先推进第一件事'); renderCurrentView(); }
        else showView('review');
      }));

      const add = panel('添加任务', '写清动作，再给它一个大致时长', true);
      const form = create('form', 'form-grid');
      const textField = field('任务', 'input', '写下今天想推进的一件事');
      const durationField = field('预计分钟', 'input', '30'); durationField.control.type = 'number'; durationField.control.min = '0'; durationField.control.value = '30';
      const submit = makeButton('加入今天', 'primary'); submit.type = 'submit';
      form.append(textField.wrap, durationField.wrap, submit);
      form.addEventListener('submit', event => {
        event.preventDefault(); const text = textField.control.value.trim(); if (!text) return toast('先写下任务');
        state.tasks.push({ id: uid(), text, duration: Math.max(0, Number(durationField.control.value) || 0), done: false, completedAt: null, createdAt: nowISO() });
        saveState(); renderCurrentView(); toast('任务已加入今天');
      });
      const chips = create('div', 'task-chips');
      chips.setAttribute('aria-label', '任务方向快捷填写');
      (INITIAL_CONFIG.taskTopics || []).forEach(topic => {
        const chip = makeButton(topic, 'task-chip', () => { textField.control.value = topic; textField.control.focus(); }, '填写任务方向：' + topic);
        chips.append(chip);
      });
      if (chips.childElementCount) add.box.append(chips);
      add.box.append(form);

      const listPanel = panel('今天的任务', '保留未完成任务与今天已完成的任务，历史记录会随备份保存', true);
      const list = create('div', 'task-list'); visibleTasks.forEach(item => list.append(taskRow(item)));
      if (!visibleTasks.length) list.append(create('div', 'empty', '还没有任务，先添加一件真正重要的事'));
      listPanel.box.append(list);
      root.append(progressPanel.box, spacer(), add.box, spacer(), listPanel.box);
    }

    function field(label, type, placeholder) {
      const wrap = create('div', 'field'); const labelNode = create('label', '', label);
      const control = create(type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input', type === 'textarea' ? 'textarea' : type === 'select' ? 'select' : 'input');
      control.id = 'field-' + uid(); labelNode.htmlFor = control.id;
      if (placeholder) control.placeholder = placeholder;
      wrap.append(labelNode, control); return { wrap, control, label: labelNode };
    }

    function spacer() { const space = create('div'); space.style.height = '18px'; return space; }
    function metric(value, label) { const box = create('div', 'metric'); box.append(create('strong', '', value), create('span', '', label)); return box; }

    function captureRow(item, compact = false) {
      const row = create('div', 'capture-item');
      const badge = create('span', 'tag', TYPE_LABELS[item.type] || '记录');
      const copy = create('div', 'capture-copy'); copy.append(create('strong', '', item.text));
      const metaParts = [formatDate(item.createdAt, { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })];
      if (item.link) metaParts.push(item.link); copy.append(create('span', '', metaParts.join(' · ')));
      row.append(badge, copy);
      if (!compact) {
        const actions = create('div', 'item-actions');
        actions.append(makeButton('转任务', 'small', () => captureToTask(item)), makeButton('转内容', 'small', () => captureToContent(item)), makeButton('删除', 'small danger', () => deleteCapture(item.id)));
        row.append(actions);
      }
      return row;
    }

    function captureToTask(item) {
      state.tasks.push({ id: uid(), text: item.text, duration: 30, done: false, completedAt: null, createdAt: nowISO() });
      deleteCapture(item.id, false); saveState(); renderCurrentView(); toast('已转为今日任务');
    }
    function captureToContent(item) {
      state.contents.push({ id: uid(), title: item.text, platform: '待确定', stage: 'ideas', createdAt: nowISO() });
      deleteCapture(item.id, false); saveState(); renderCurrentView(); toast('已进入内容看板');
    }
    function deleteCapture(id, rerender = true) { state.captures = state.captures.filter(item => item.id !== id); saveState(); if (rerender) { renderCurrentView(); toast('记录已删除'); } }

    function renderInbox(root) {
      const add = panel('先收下来', '不要求完整，先让想法有地方落脚', true);
      const form = create('form', 'form-grid four');
      const textField = field('内容', 'input', '刚刚想到什么？');
      const typeField = field('类型', 'select');
      Object.entries(TYPE_LABELS).forEach(([value, label]) => { const option = create('option', '', label); option.value = value; typeField.control.append(option); });
      const linkField = field('相关链接', 'input', '可选'); linkField.control.type = 'url';
      const submit = makeButton('收进来', 'primary'); submit.type = 'submit';
      form.append(textField.wrap, typeField.wrap, linkField.wrap, submit);
      form.addEventListener('submit', event => {
        event.preventDefault(); const text = textField.control.value.trim(); if (!text) return toast('先写下一句话');
        state.captures.unshift({ id: uid(), text, type: typeField.control.value, link: linkField.control.value.trim(), createdAt: nowISO() });
        saveState(); renderCurrentView(); toast('已放进收件箱');
      }); add.box.append(form);

      const listPanel = panel('全部记录', '搜索、筛选，再决定它下一步去哪', true);
      const toolbar = create('div', 'toolbar'); const search = create('input', 'input'); search.placeholder = '搜索记录'; search.setAttribute('aria-label', '搜索灵感记录'); search.style.maxWidth = '260px';
      const filter = create('select', 'select'); filter.setAttribute('aria-label', '筛选灵感类型'); filter.style.maxWidth = '150px';
      [['all', '全部类型'], ...Object.entries(TYPE_LABELS)].forEach(([value, label]) => { const option = create('option', '', label); option.value = value; filter.append(option); });
      toolbar.append(search, filter); const list = create('div', 'capture-list');
      const draw = () => {
        list.replaceChildren(); const query = search.value.trim().toLowerCase();
        const items = state.captures.filter(item => (filter.value === 'all' || item.type === filter.value) && (!query || item.text.toLowerCase().includes(query)));
        items.forEach(item => list.append(captureRow(item)));
        if (!items.length) list.append(create('div', 'empty', state.captures.length ? '没有匹配的记录' : '收件箱还是空的'));
      };
      search.addEventListener('input', draw); filter.addEventListener('change', draw); draw();
      listPanel.box.append(toolbar, list); root.append(add.box, spacer(), listPanel.box);
    }

    function renderContent(root) {
      const published = state.contents.filter(item => item.stage === 'published');
      const metrics = create('div', 'metric-strip content-metrics');
      metrics.append(metric(state.contents.length, '全部内容'), metric(state.contents.length - published.length, '推进中'), metric(published.length, '累计已发布'));
      root.append(metrics);
      const add = panel('添加内容', '先用一句话记住要解决的问题', true);
      const form = create('form', 'form-grid');
      const titleField = field('内容标题或问题', 'input', '例如：怎么搭自己的个人工作台');
      const platformField = field('平台', 'input', '网文 / 公众号 / AI绘图 / 视频');
      const submit = makeButton('加入看板', 'primary'); submit.type = 'submit';
      form.append(titleField.wrap, platformField.wrap, submit);
      form.addEventListener('submit', event => {
        event.preventDefault(); const title = titleField.control.value.trim(); if (!title) return toast('先写下内容方向');
        state.contents.push({ id: uid(), title, platform: platformField.control.value.trim() || '待确定', stage: 'ideas', createdAt: nowISO() });
        saveState(); renderCurrentView(); toast('内容已加入看板');
      }); add.box.append(form);

      const boardPanel = panel('生产流程', '拖动卡片，或用左右按钮推进', true);
      const board = create('div', 'kanban');
      CONTENT_STAGES.forEach(stage => {
        const column = create('section', 'kanban-column'); column.dataset.stage = stage.id;
        const items = state.contents.filter(item => item.stage === stage.id);
        const head = create('div', 'column-head'); head.append(create('strong', '', stage.label), create('span', 'column-count', items.length));
        const stack = create('div', 'kanban-stack'); items.forEach(item => stack.append(contentCard(item)));
        column.append(head, stack);
        column.addEventListener('dragover', event => { event.preventDefault(); column.classList.add('dragover'); });
        column.addEventListener('dragleave', () => column.classList.remove('dragover'));
        column.addEventListener('drop', event => {
          event.preventDefault(); column.classList.remove('dragover'); const id = event.dataTransfer.getData('text/plain'); moveContentTo(id, stage.id);
        }); board.append(column);
      }); boardPanel.box.append(board); root.append(add.box, spacer(), boardPanel.box);
    }

    function contentCard(item) {
      const card = create('article', 'content-card'); card.draggable = true; card.dataset.id = item.id;
      card.addEventListener('dragstart', event => event.dataTransfer.setData('text/plain', item.id));
      card.append(create('strong', '', item.title), create('p', '', item.platform || '待确定'));
      const actions = create('div', 'button-row'); const index = CONTENT_STAGES.findIndex(stage => stage.id === item.stage);
      if (index > 0) {
        const back = makeButton('', 'small icon', () => moveContent(item.id, -1), '向前移动');
        back.innerHTML = iconMarkup('arrowLeft'); actions.append(back);
      }
      if (index < CONTENT_STAGES.length - 1) {
        const next = makeButton('', 'small icon', () => moveContent(item.id, 1), '向后移动');
        next.innerHTML = iconMarkup('arrowRight'); actions.append(next);
      }
      actions.append(makeButton('删除', 'small danger', () => { state.contents = state.contents.filter(entry => entry.id !== item.id); saveState(); renderCurrentView(); toast('内容已删除'); }));
      card.append(actions); return card;
    }
    function moveContent(id, delta) {
      const item = state.contents.find(entry => entry.id === id); if (!item) return;
      const index = CONTENT_STAGES.findIndex(stage => stage.id === item.stage);
      moveContentTo(id, CONTENT_STAGES[Math.max(0, Math.min(CONTENT_STAGES.length - 1, index + delta))].id);
    }
    function moveContentTo(id, stage) {
      const item = state.contents.find(entry => entry.id === id);
      if (!item || !CONTENT_STAGES.some(entry => entry.id === stage)) return;
      if (item.stage !== stage) item.publishedAt = stage === 'published' ? nowISO() : null;
      item.stage = stage; saveState(); renderCurrentView();
    }

    function renderSkills(root) {
      const add = panel('添加 Skill 卡', '记录它适合做什么，以及第一句怎么调用', true);
      const form = create('form', 'form-grid four');
      const nameField = field('名称', 'input', '例如：选题研究');
      const categoryField = field('分类', 'input', '内容');
      const promptField = field('第一句调用', 'input', '请帮我……');
      const submit = makeButton('加入地图', 'primary'); submit.type = 'submit';
      form.append(nameField.wrap, categoryField.wrap, promptField.wrap, submit);
      form.addEventListener('submit', event => {
        event.preventDefault(); const name = nameField.control.value.trim(); const prompt = promptField.control.value.trim(); if (!name || !prompt) return toast('名称和第一句调用都要填写');
        state.skills.unshift({ id: uid(), name, category: categoryField.control.value.trim() || '其他', description: '自定义 Skill', prompt, favorite: false, sample: false });
        saveState(); renderCurrentView(); toast('Skill 已加入地图');
      }); add.box.append(form);

      const map = panel('我的 Skills', '只展示自己已安装或准备使用的 Skill；复制调用语后再自行发送', true);
      const toolbar = create('div', 'toolbar'); const search = create('input', 'input'); search.placeholder = '搜索 Skill、分类或用途'; search.setAttribute('aria-label', '搜索 Skill'); search.style.maxWidth = '320px';
      const favoriteOnly = makeButton('只看收藏', 'small'); let onlyFavorites = false;
      favoriteOnly.addEventListener('click', () => { onlyFavorites = !onlyFavorites; favoriteOnly.classList.toggle('soft', onlyFavorites); draw(); });
      toolbar.append(search, favoriteOnly); const grid = create('div', 'skill-grid');
      const draw = () => {
        grid.replaceChildren(); const query = search.value.trim().toLowerCase();
        const items = state.skills.filter(item => (!onlyFavorites || item.favorite) && (!query || [item.name, item.category, item.description].join(' ').toLowerCase().includes(query)));
        items.sort((a, b) => Number(b.favorite) - Number(a.favorite)).forEach(item => grid.append(skillCard(item)));
        if (!items.length) grid.append(create('div', 'empty', state.skills.length ? '没有匹配的 Skill' : '暂不预填 · 可以在上方添加已安装或准备展示的 Skill'));
      };
      search.addEventListener('input', draw); draw(); map.box.append(toolbar, grid); root.append(add.box, spacer(), map.box);
    }

    function skillCard(item) {
      const card = create('article', 'skill-card' + (item.favorite ? ' favorite' : ''));
      const badge = create('span', 'tag', item.category || '其他');
      card.append(badge, create('h4', '', item.name), create('p', '', item.description || '暂无说明'));
      if (item.sample) card.append(create('span', 'muted', '示例卡 · 不代表已经安装'));
      card.append(create('div', 'skill-prompt', item.prompt));
      const actions = create('div', 'item-actions');
      actions.append(makeButton('复制调用语', 'small primary', () => copyText(item.prompt), '复制调用语（只复制，不执行）'), makeButton(item.favorite ? '取消收藏' : '收藏', 'small', () => { item.favorite = !item.favorite; saveState(); renderCurrentView(); }));
      actions.append(makeButton('删除', 'small danger', () => { state.skills = state.skills.filter(entry => entry.id !== item.id); saveState(); renderCurrentView(); toast('Skill 卡已删除'); }));
      card.append(actions); return card;
    }

    async function copyText(text) {
      try { await navigator.clipboard.writeText(text); toast('调用语已复制，请自行发送以调用'); }
      catch (_) {
        const area = create('textarea'); area.value = text; area.style.position = 'fixed'; area.style.opacity = '0'; document.body.append(area); area.select();
        const copied = document.execCommand('copy'); area.remove();
        toast(copied ? '调用语已复制，请自行发送以调用' : '复制未成功，请选中调用语手动复制');
      }
    }

    function renderReview(root) {
      const today = todayKey(); const existing = state.reviews.find(item => item.date === today);
      const summary = panel('今天的数据', '今日按当天完成和发布时间统计；累计发布为当前已发布内容总数', true);
      const done = completedToday().length;
      const published = state.contents.filter(item => item.stage === 'published');
      const publishedToday = published.filter(item => localDateKey(item.publishedAt) === today).length;
      const metrics = create('div', 'metric-strip'); metrics.append(metric(done, '今日完成任务'), metric(publishedToday, '今日发布'), metric(published.length, '累计已发布'), metric(state.captures.length, '待处理灵感'));
      summary.box.append(metrics);

      const formPanel = panel(existing ? '更新今日复盘' : '结束今天', '三句话，把今天收好', true);
      const form = create('form'); const completed = field('今天完成了什么', 'textarea', '记录真正推进的事情');
      const blocked = field('什么事情卡住了', 'textarea', '没有也可以写“无”'); const tomorrow = field('明天最重要的一件事', 'textarea', '只写一件');
      completed.control.value = existing?.completed || ''; blocked.control.value = existing?.blocked || ''; tomorrow.control.value = existing?.tomorrow || '';
      [completed.wrap, blocked.wrap, tomorrow.wrap].forEach((wrap, index) => { if (index) wrap.style.marginTop = '12px'; form.append(wrap); });
      const submit = makeButton(existing ? '更新复盘' : '保存复盘', 'primary'); submit.type = 'submit'; submit.style.marginTop = '14px'; form.append(submit);
      form.addEventListener('submit', event => {
        event.preventDefault(); if (!completed.control.value.trim() || !tomorrow.control.value.trim()) return toast('至少写下完成事项和明日重点');
        const review = { id: existing?.id || uid(), date: today, completed: completed.control.value.trim(), blocked: blocked.control.value.trim(), tomorrow: tomorrow.control.value.trim(), savedAt: nowISO() };
        state.reviews = [review, ...state.reviews.filter(item => item.date !== today)]; saveState(); renderCurrentView(); toast('今天已经收好了');
      }); formPanel.box.append(form);

      const history = panel('历史复盘', '回头看时，只保留真正发生过的事', true); const list = create('div', 'review-list');
      state.reviews.forEach(item => {
        const row = create('article', 'review-item'); row.append(create('div', 'review-date', item.date));
        const body = create('div', 'review-body'); body.append(create('p', '', `完成：${item.completed}`), create('p', '', `卡点：${item.blocked || '无'}`), create('p', '', `明日：${item.tomorrow}`)); row.append(body); list.append(row);
      }); if (!state.reviews.length) list.append(create('div', 'empty', '还没有复盘记录'));
      history.box.append(list); root.append(summary.box, spacer(), formPanel.box, spacer(), history.box);
    }

    function renderSettings(root) {
      const layout = create('div', 'settings-grid');
      const profile = panel('身份与主题', '让工作台看起来像你的，而不是模板');
      const form = create('form'); const title = field('工作台名称', 'input'); const name = field('显示姓名', 'input'); const role = field('身份或场景', 'input');
      title.control.value = state.profile.title; name.control.value = state.profile.displayName; role.control.value = state.profile.role;
      [title.wrap, name.wrap, role.wrap].forEach((wrap, index) => { if (index) wrap.style.marginTop = '11px'; form.append(wrap); });
      const save = makeButton('保存身份', 'primary'); save.type = 'submit'; save.style.marginTop = '13px'; form.append(save);
      form.addEventListener('submit', event => {
        event.preventDefault(); const values = [title.control.value.trim(), name.control.value.trim(), role.control.value.trim()]; if (values.some(value => !value)) return toast('三项都需要填写');
        state.profile = { title: values[0], displayName: values[1], role: values[2] }; saveState(); applyTheme(); toast('身份信息已保存');
      }); profile.box.append(form, spacer(), create('div', 'muted', '选择主题'));
      const themes = create('div', 'theme-grid');
      [
        { id: 'warm', name: '暖橙', colors: ['#fffdf9', '#d9652b', '#25221e'] },
        { id: 'blue', name: '雾蓝', colors: ['#fbfdff', '#4267a9', '#17243a'] },
        { id: 'mint', name: '薄荷', colors: ['#fcfefc', '#3f8066', '#1c2b25'] }
      ].forEach(theme => {
        const option = create('button', 'theme-option' + (state.theme === theme.id ? ' active' : '')); option.type = 'button';
        const swatches = create('div', 'swatches'); theme.colors.forEach(color => { const swatch = create('span', 'swatch'); swatch.style.background = color; swatches.append(swatch); });
        option.append(swatches, create('strong', '', theme.name)); option.addEventListener('click', () => { state.theme = theme.id; saveState(); applyTheme(); renderCurrentView(); toast('主题已切换'); }); themes.append(option);
      }); profile.box.append(themes);

      const modules = panel('首页模块', '隐藏不需要的入口，调整使用顺序'); const list = create('div', 'module-list');
      state.moduleOrder.forEach((id, index) => {
        const row = create('div', 'module-row'); const check = create('input'); check.type = 'checkbox'; check.checked = state.enabledModules.includes(id); check.disabled = id === 'home'; check.setAttribute('aria-label', `显示${MODULE_META[id].label}`);
        check.addEventListener('change', () => { state.enabledModules = check.checked ? [...new Set([...state.enabledModules, id])] : state.enabledModules.filter(item => item !== id); saveState(); renderNav(); toast('模块设置已保存'); });
        const label = create('span', 'module-label');
        label.append(iconNode(MODULE_META[id].icon), create('span', '', MODULE_META[id].label));
        const order = create('div', 'module-order');
        const up = makeButton('', 'small icon', () => moveModule(index, -1), '上移'); up.innerHTML = iconMarkup('chevronUp');
        const down = makeButton('', 'small icon', () => moveModule(index, 1), '下移'); down.innerHTML = iconMarkup('chevronDown');
        order.append(up, down);
        row.append(check, label, order); list.append(row);
      }); modules.box.append(list);

      layout.append(profile.box, modules.box); root.append(layout, spacer());
      const install = panel('安装到设备', '把这张工作台放到手机或电脑桌面', true);
      const installCopy = create('div', 'install-panel-copy');
      const installStatus = create('div', 'install-status');
      installStatus.innerHTML = iconMarkup('install');
      const installText = create('div');
      installText.append(create('strong', '', installState().title), create('span', '', installState().detail));
      installText.firstChild.id = 'install-status-title';
      installText.lastChild.id = 'install-status-detail';
      installStatus.append(installText);
      const installButton = makeButton('安装个人工作台', 'primary', requestInstall);
      installButton.id = 'settings-install-button';
      installCopy.append(installStatus, installButton, create('p', 'muted', '安装只改变打开方式，不会自动同步电脑与手机的数据。换设备前请先导出 JSON。'));
      install.box.append(installCopy);
      root.append(install.box, spacer());
      const data = panel('数据与备份', '所有数据只保存在当前浏览器，请主动导出备份', true); const zone = create('div', 'data-zone');
      zone.append(makeButton('导出 JSON', 'primary', exportData));
      const importLabel = create('label', 'button file-button', '导入 JSON'); const fileInput = create('input'); fileInput.type = 'file'; fileInput.accept = 'application/json,.json'; fileInput.setAttribute('aria-label', '导入 JSON 备份'); fileInput.addEventListener('change', importData); importLabel.append(fileInput); zone.append(importLabel);
      zone.append(makeButton('恢复初始数据', 'danger', resetData)); data.box.append(zone, create('p', 'muted', 'V1.1 不包含云同步、账号体系、Obsidian 读写和外部 Skill 自动执行。'));
      root.append(data.box);
      syncInstallUI();
    }

    function moveModule(index, delta) {
      const next = index + delta; if (next < 0 || next >= state.moduleOrder.length) return;
      [state.moduleOrder[index], state.moduleOrder[next]] = [state.moduleOrder[next], state.moduleOrder[index]]; saveState(); renderNav(); renderCurrentView();
    }

    function exportData() {
      const payload = { app: 'xindao-personal-workbench', exportedAt: nowISO(), state };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const link = create('a');
      link.href = url; link.download = `${state.profile.title}-${todayKey()}.json`; document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(url); toast('备份已经导出');
    }

    function importData(event) {
      const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader();
      reader.onload = () => {
        try {
          const payload = JSON.parse(String(reader.result)); const candidate = payload.state || payload;
          if (!candidate || candidate.version !== 1 || !Array.isArray(candidate.tasks)) throw new Error('格式不匹配');
          state = hydrate(candidate); saveState(); applyTheme(); syncWallpaper(); showView('home'); toast('备份已导入');
        } catch (_) { toast('无法导入：请选择本工作台导出的 JSON'); }
        event.target.value = '';
      }; reader.readAsText(file);
    }

    function resetData() {
      if (!window.confirm('确定恢复初始数据？当前浏览器里的任务、灵感和复盘都会被清空。')) return;
      state = defaultState(); saveState(); applyTheme(); syncWallpaper(); showView('home'); toast('已经恢复初始数据');
    }

    function updateClock() {
      $('#clock-pill').textContent = new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
      $('#date-pill').textContent = formatDate(new Date(), { month: 'long', day: 'numeric', weekday: 'short' });
    }

    function init() {
      applyTheme();
      $('.footer-note').textContent = INITIAL_CONFIG.pwaEnabled
        ? `${state.profile.displayName}个人工作台 · PWA 版 · 本地保存 · 可安装 · 随时导出`
        : `${state.profile.displayName}个人工作台 · 单文件备用版 · 本地保存 · 随时导出`;
      $('#wallpaper-toggle').addEventListener('click', () => { state.wallpaperPaused = !state.wallpaperPaused; saveState(); syncWallpaper(); });
      syncWallpaper();
      $('#date-pill').textContent = formatDate(new Date(), { month: 'long', day: 'numeric', weekday: 'short' });
      $('#wifi-icon').innerHTML = iconMarkup('wifi');
      $('#install-app-icon').innerHTML = iconMarkup('install');
      $('#install-app-button').addEventListener('click', requestInstall);
      window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        deferredInstallPrompt = event;
        syncInstallUI();
      });
      window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;
        toast('个人工作台已安装');
        syncInstallUI();
      });
      window.matchMedia('(display-mode: standalone)').addEventListener?.('change', syncInstallUI);
      if (INITIAL_CONFIG.pwaEnabled && 'serviceWorker' in navigator && location.protocol !== 'file:') {
        navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Service Worker 注册失败：', error));
      }
      updateClock();
      setInterval(updateClock, 30000);
      if (!state.enabledModules.includes('home')) state.enabledModules.unshift('home');
      saveState(); showView('home');
      syncInstallUI();
      window.__WORKBENCH_TEST__ = { getState: () => state, showView, storageKey: STORAGE_KEY, installState, requestInstall, pwaEnabled: Boolean(INITIAL_CONFIG.pwaEnabled) };
    }
    init();
  })();
