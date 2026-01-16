# TanStack Query Implementation Guide

## ✅ Status: Fully Implemented

Aplikasi sudah menggunakan **TanStack Query (React Query v5)** dengan best practices.

---

## 📋 Struktur Implementasi

### 1. **Custom Hooks dengan useQuery**

File: `src/features/*/hooks/use*.ts`

```typescript
// Example: useCategories.ts
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api/axios.ts";

export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const { data } = await apiClient.get("/categories");
            return data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
```

**Fitur:**

- ✅ Automatic caching
- ✅ Smart revalidation
- ✅ Loading/Error states built-in

---

### 2. **Dialog Components dengan useMutation**

File: `src/features/*/admin/components/*Dialog.tsx`

```typescript
// CategoryDialog.tsx
const mutation = useMutation({
    mutationFn: async (data) => {
        const url = dataToEdit ? `/categories/${dataToEdit.id}` : "/categories";
        return dataToEdit 
            ? apiClient.put(url, data)
            : apiClient.post(url, data);
    },
    onSuccess: () => {
        // Invalidate cache untuk auto-refetch
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        onSuccess();
        onOpenChange(false);
    },
    onError: (error) => {
        // Type-safe error handling
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message;
            setErrorMessage(message);
        }
    },
});
```

**Fitur:**

- ✅ Automatic loading state (`mutation.isPending`)
- ✅ Type-safe error handling
- ✅ Automatic cache invalidation
- ✅ Optimistic updates ready

---

### 3. **Setup di Main.tsx**

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
```

---

## 🎯 Features yang Sudah Digunakan

### ✅ Queries (Data Fetching)

- `useQuery` - untuk GET requests
- `queryKey` - untuk cache management
- `staleTime` - untuk revalidation timing

### ✅ Mutations (Create/Update/Delete)

- `useMutation` - untuk POST/PUT/DELETE
- `queryClient.invalidateQueries` - untuk cache invalidation
- `onSuccess/onError` callbacks

### ✅ Error Handling

- Type-safe error handling dengan axios
- Custom error messages
- UI feedback

---

## 📁 Struktur File yang Menggunakan TQ

```
src/features/
├── categories/
│   ├── hooks/
│   │   └── useCategories.ts          ← useQuery
│   └── admin/components/
│       └── CategoryDialog.tsx         ← useMutation
├── tags/
│   ├── hooks/
│   │   └── useTags.ts               ← useQuery
│   └── admin/components/
│       └── TagDialog.tsx            ← useMutation
├── projects/
│   ├── hooks/
│   │   └── useProjects.ts           ← useQuery
│   └── admin/components/
│       └── ProjectDialog.tsx        ← useMutation
├── tech-stacks/
│   ├── hooks/
│   │   └── useTechStacks.ts         ← useQuery
│   └── admin/components/
│       └── TechStackDialog.tsx      ← useMutation
└── profile/
    ├── hooks/
    │   └── useProfile.ts            ← useQuery
    └── admin/
        └── index.tsx                ← useMutation
```

---

## 🔧 Best Practices Diterapkan

### 1. **Separation of Concerns**

- Hooks: Data fetching logic → `hooks/use*.ts`
- Components: UI logic → `components/*Dialog.tsx`

### 2. **Type Safety**

- `ApiResponse<T>` interface untuk response typing
- `useMutation<TData, TError, TVariables>`

### 3. **Error Handling**

```typescript
if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    setErrorMessage(message);
}
```

### 4. **Automatic Cache Management**

```typescript
// Setelah mutasi berhasil, refresh data
queryClient.invalidateQueries({ queryKey: ["categories"] });
```

### 5. **Loading States**

```typescript
disabled={mutation.isPending}
{mutation.isPending && <Spinner />}
```

---

## 🚀 Advanced Features Ready to Use

### Optimistic Updates

```typescript
useMutation({
    onMutate: async (newData) => {
        // Update cache immediately
        await queryClient.cancelQueries({ queryKey: ["categories"] });
        const previous = queryClient.getQueryData(["categories"]);
        queryClient.setQueryData(["categories"], (old) => [...old, newData]);
        return { previous };
    },
    onError: (err, newData, context) => {
        // Rollback on error
        queryClient.setQueryData(["categories"], context?.previous);
    },
});
```

### Pagination

```typescript
const [page, setPage] = useState(1);
const { data } = useQuery({
    queryKey: ["categories", page],
    queryFn: () => apiClient.get(`/categories?page=${page}`),
});
```

### Dependent Queries

```typescript
const { data: user } = useQuery({ queryKey: ["user"] });
const { data: posts } = useQuery({
    queryKey: ["posts", user?.id],
    queryFn: () => fetchPosts(user.id),
    enabled: !!user?.id, // Hanya fetch kalau user ada
});
```

---

## 📊 Comparison: Before vs After

| Feature          | Before    | After                |
|------------------|-----------|----------------------|
| State Management | useState  | TanStack Query       |
| Cache            | Manual    | Automatic            |
| Revalidation     | Manual    | Smart                |
| Loading State    | Manual    | Built-in             |
| Error Handling   | Try-catch | Built-in             |
| Type Safety      | Partial   | Full                 |
| Dev Tools        | No        | React Query DevTools |

---

## 🐛 Debugging

### Install React Query DevTools

```bash
npm install @tanstack/react-query-devtools
```

### Add to App

```typescript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

<QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

## 📝 Summary

✅ **CategoryDialog.tsx** sekarang:

- ✅ Menggunakan `useMutation` untuk create/update
- ✅ Type-safe error handling (`axios.isAxiosError`)
- ✅ Automatic cache invalidation
- ✅ Built-in loading state dengan `mutation.isPending`
- ✅ Error message display
- ✅ Clean code dengan separation of concerns

✅ **Semua halaman admin** menggunakan:

- useQuery untuk fetching
- useMutation untuk create/update/delete
- Automatic cache management

