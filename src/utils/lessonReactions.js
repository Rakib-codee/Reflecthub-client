export const getStorageKeys = (email) => {
    const safe = email ? String(email).toLowerCase() : 'guest';
    return {
        likedKey: `reflecthub:liked:${safe}`,
        savedKey: `reflecthub:saved:${safe}`,
    };
};

export const getCountKeys = () => {
    return {
        likeCountKey: 'reflecthub:counts:likes',
        saveCountKey: 'reflecthub:counts:saves',
    };
};

export const notifyReactionsChanged = () => {
    window.dispatchEvent(new Event('reflecthub:reactions-changed'));
};

export const readIdSet = (key) => {
    try {
        const raw = localStorage.getItem(key);
        const arr = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(arr)) return new Set();
        return new Set(arr.map(String));
    } catch {
        return new Set();
    }
};

export const writeIdSet = (key, set) => {
    const arr = Array.from(set);
    localStorage.setItem(key, JSON.stringify(arr));
    notifyReactionsChanged();
};

export const readCountMap = (key) => {
    try {
        const raw = localStorage.getItem(key);
        const obj = raw ? JSON.parse(raw) : {};
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return {};
        return obj;
    } catch {
        return {};
    }
};

export const writeCountMap = (key, map) => {
    localStorage.setItem(key, JSON.stringify(map));
    notifyReactionsChanged();
};

export const getLessonCount = (key, id) => {
    const map = readCountMap(key);
    const val = map?.[String(id)];
    return typeof val === 'number' && Number.isFinite(val) ? val : 0;
};

export const addLessonCount = (key, id, delta) => {
    const map = readCountMap(key);
    const sid = String(id);
    const current = typeof map[sid] === 'number' && Number.isFinite(map[sid]) ? map[sid] : 0;
    const next = Math.max(0, current + delta);
    map[sid] = next;
    writeCountMap(key, map);
    return next;
};

export const isIdInSet = (key, id) => {
    const set = readIdSet(key);
    return set.has(String(id));
};

export const toggleIdInSet = (key, id) => {
    const set = readIdSet(key);
    const sid = String(id);
    let next;

    if (set.has(sid)) {
        set.delete(sid);
        next = false;
    } else {
        set.add(sid);
        next = true;
    }

    writeIdSet(key, set);
    return next;
};

export const toggleReactionWithCount = ({ setKey, countKey, id }) => {
    const next = toggleIdInSet(setKey, id);
    addLessonCount(countKey, id, next ? 1 : -1);
    return next;
};

export const countSet = (key) => {
    return readIdSet(key).size;
};
