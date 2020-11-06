export default function (name, level) {
    let arr = []
    if (level == 5) {
        arr.push({
            name: name,
            level: 5
        })
        return
    }
    if (level == 4) {
        arr.push({
            name: '全国',
            level: 5
        })
        arr.push({
            name: name,
            level: 4
        })
    }
    if (level == 3) {
        arr.push()
    }
}