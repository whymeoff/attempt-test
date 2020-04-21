const attempt = (available, allowed, preferred) => {
    const res = []

    for (let i = 0; i < preferred.length; i++) {
        let k = 0

        for (let j = 0; j < available.length; j++) {
            if (preferred[i] === available[j] && 
                !res.find((item) => item === available[j]) && // check if value already exists in result array
                allowed.find((item) => item === preferred[i] || item === 'any') // check if value is allowed or , its type of any
            ) {
                res.push(available[j])
                k++
                break
            } else if (preferred[i] === 'any') { // just take random index of available array, and if it`s allowed, pushing it into result
                const randomIndex = Math.floor(Math.random() * (available.length - 0))

                if (!res.find((item) => item === available[randomIndex]) &&
                    allowed.find((item) => item === available[randomIndex])
                ) {
                    res.push(available[randomIndex])
                    k++
                }
                break
            }
        }

        if (k === 0 && !res.find((item) => item === preferred[i])) {
            let item = findFirstBigger(preferred[i], available, allowed) ||
                        findFirstSmaller(preferred[i], available, allowed)

            if (!res.find((num) => num === item) && item) {
                res.push(item)
            }
        }
    }

    return res.length === 0 ? 'error' : res
}

const findFirstBigger = (value, arr, allowed) => {
    let max, index

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > value && 
            allowed.find((item) => item === arr[i] || item === 'any')
        ) {
            index = i
            max = arr[i]
            break
        }
    }

    for (let i = index; i < arr.length; i++) {
        if (arr[i] > value && 
            arr[i] < max && 
            allowed.find((item) => item === arr[i] || item === 'any')
        ) {
            max = arr[i]
        }
    }
    
    return max || false
}

const findFirstSmaller = (value, arr, allowed) => {
    let min, index

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < value && 
            allowed.find((item) => item === arr[i] || item === 'any')
        ) {
            index = i
            min = arr[i]
            break
        }
    }

    for (let i = index; i < arr.length; i++) {
        if (arr[i] < value && 
            arr[i] > min && 
            allowed.find((item) => item === arr[i] || item === 'any')
        ) {
            min = arr[i]
        }
    }
    
    return min || false
}

// first example is invalid, because you need to have both available and allowed arrays to show the result. I think it`s just mistake in docs 
console.log(attempt([240,720], [360,720], [1080])) // example 2
console.log(attempt([240], [360,720], [1080])) // example 3
console.log(attempt([240, 360, 720], [240, 360, 720, 1080], [240, 360])) // example 4
console.log(attempt([240,720], [240,360,720,1080], [240,360])) // example 5
console.log(attempt([240,720],[240,360,1080],[240,360])) // example 6
console.log(attempt([720], [240,360,1080], [240,360])) // example 7
console.log(attempt([240,360,720], [360, 'any'], [360,720])) // example 8
console.log(attempt([240,360,720], [240,360,720], ['any', 720])) // example 9
console.log(attempt([240,360,720], [360,1080],['any',720])) // example 10