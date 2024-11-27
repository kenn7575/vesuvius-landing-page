type MenuItem = {
    name: string;
    description: string;
    price_in_oere: number;
    image_path: string;
};

type Menu = {
    name: string;
    is_food: boolean;
    menu_item: MenuItem[] | undefined;
};

// Fetch menu data
async function getMenu(): Promise<Menu[]> {
    const res = await fetch("http://localhost:5005/menu", { next: { revalidate: 3600 } });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

// Menu page component
export default async function MenuPage() {
    const data = await getMenu();

    return (
        <main className="menu bg-gray-100">
            <h1 className="text-4xl mb-6 pt-8 text-center border-b border-gray-500 border-dashed">Menu</h1>
            <ul className="space-y-6">
                {data.map((category: Menu, index) => (
                    <li
                        key={category.name}
                        className={`pb-4 px-4 py-4 ${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                    >
                        <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                        <ul className="space-y-4 ml-6">
                            {category.menu_item && Array.isArray(category.menu_item) ? (
                                category.menu_item.map((item: MenuItem, index: number) => (
                                    <li
                                        key={index}
                                        className="border-b border-gray-200 pb-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-lg text-gray-700">
                                                {item.price_in_oere / 100} kr
                                            </p>
                                        </div>
                                        <p className="italic text-gray-600 mt-1">
                                            {item.description}
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <p className="italic text-gray-500 ml-6">No items available</p>
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
        </main>
    );
}