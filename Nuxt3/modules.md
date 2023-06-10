### [Pinia](https://pinia.vuejs.org/zh/core-concepts/)
### [持久化插件 Pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/)


安装
```
pnpm add pinia @pinia/nuxt
pnpm add @pinia-plugin-persistedstate/nuxt -D
```

配置
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'], // 自动引入pinia函数
      },
    ],
    '@pinia-plugin-persistedstate/nuxt', // pinia 持久化
  ],
  imports: {
    dirs: ['stores/**'], // 自动导入 stores
  },
})
```

使用
```typescript
// stores/useAppStore.ts
export const useAppStore = defineStore('app', {
    state: () => ({
        count: 11
    }),
    persist: {
        key: 'app-pinia-store',
        storage: persistedState.localStorage,
        paths: ['count']
    },
    actions: {
        addCount(){
            this.count++
        }
    }
})
```