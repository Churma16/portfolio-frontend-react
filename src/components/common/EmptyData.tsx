export default function EmptyData({itemName}: { itemName: string }) {
    return (
        <div className="flex items-center justify-center py-12 text-accent/60">
            No {itemName} yet. Create one to get started!
        </div>
    )
}