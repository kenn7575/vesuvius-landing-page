export const revalidate = 900;
import Image from "next/image";

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

// Helper function to randomly select two MenuItem objects
function getRandomItems(menu: Menu[]): MenuItem[] {
    const foodItems = menu
        .filter((category) => category.is_food && category.menu_item) // Filter food categories
        .flatMap((category) => category.menu_item || []); // Flatten all food items into one array

    if (foodItems.length < 2) {
        throw new Error("Not enough food items available to select two unique items.");
    }

    // Select two unique random indices
    const firstIndex = Math.floor(Math.random() * foodItems.length);
    let secondIndex;
    do {
        secondIndex = Math.floor(Math.random() * foodItems.length);
    } while (secondIndex === firstIndex);

    return [foodItems[firstIndex], foodItems[secondIndex]];
}

// Menu page component
export default async function MenuPage() {
    const data = await getMenu();
    const randomItems = getRandomItems(data);

  return (
    <main className="menu px-4 py-8">
      <h2 className="text-4xl text-orange-950 mb-4">
        Oplev vores spændende menu
      </h2>
      <p className="text-gray-700 mb-8">
        Gå til menuen for at se mere af vores spændende udvalg!{" "}
        <a
          href="/menu"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Se hele menuen
        </a>
      </p>
      <ul className="space-y-6">
        {randomItems.map((item, index) => (
          <li
            key={index}
            className={`border-b border-gray-200 pb-4 ${
              index === 1 ? "flex-row-reverse" : ""
            } flex items-center flex-wrap gap-4`}
          >
            {/* Image with specific styles */}
            <Image
              src={`/img/${item.image_path}`}
              alt={item.name}
              className={`w-32 h-32 object-cover shadow-md rounded-full`}
              width={300}
              height={300}
              priority={index === 0} // Prioritize loading the first image for better LCP
            />
            {/* Content */}
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="italic text-gray-600">{item.description}</p>
              <p className="text-lg text-gray-700">
                {item.price_in_oere / 100} kr
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}