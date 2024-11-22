// `app/page.tsx` is the UI for the `/` URL
async function getData() {
    const res = await fetch('http://localhost:5005/menu_items')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {
    const data = await getData();

    return (
        <main className="menu px-4 py-8">
            <h1 className="text-4xl text-orange-950 mb-6">Menu</h1>
            <ul className="space-y-6">
                {data.map((item: any) => (
                    <li key={item.id} className="border-b border-gray-200 pb-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">{item.name}</h2>
                            <p className="text-xl font-bold text-gray-700">
                                {item.price_in_oere / 100} kr
                            </p>
                        </div>
                        <p className="italic text-gray-600 ml-10 mt-2">
                            {item.description}
                        </p>
                    </li>
                ))}
            </ul>
        </main>
    );
}