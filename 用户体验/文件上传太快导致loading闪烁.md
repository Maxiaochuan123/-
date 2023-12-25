[文件上传太快导致loading闪烁] (https://www.bilibili.com/video/BV1Rz4y1E7XT/?spm_id_from=333.1007.tianma.1-1-1.click&vd_source=3d9e9a0e7677ae790c38995a8e2d121a)

假设你的上传后端太快一瞬间就上传完毕了, 如果你的上传添加了 loading 动画效果, 就会导致瞬间闪烁, 给用户带来不确定性, 所以给了一个延迟函数设置至少等待时间

```typescript
export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const minDelay = async <T>(promise: Promise<T>, ms: number) => {
    const [p] = await Promise.all([promise, sleep(ms)])
    return p
}

const a = () => {
    const obj = {name:'zs', age: 17}
    return [name] = obj
}
```