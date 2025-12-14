export const getStorageKeys = (email) => {
    const safe = email ? String(email).toLowerCase() : 'guest';
    return {
        likedKey: `reflecthub:liked:${safe}`,
        savedKey: `reflecthub:saved:${safe}`,
    };
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

export const countSet = (key) => {
    return readIdSet(key).size;
};
