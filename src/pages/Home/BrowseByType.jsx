import hotel from "../../assets/hotels.jpeg";
import appartment from "../../assets/appartment.jpeg";
import resort from "../../assets/resort.jpeg";
import villa from "../../assets/villas.jpeg";

const BrowseByType = () => {
  const propertyTypeList = [
    {
      id: 1,
      name: "Hotel",
      image: hotel,
    },
    {
      id: 1,
      name: "Appartment",
      image: appartment,
    },
    {
      id: 1,
      name: "Resort",
      image: resort,
    },
    {
      id: 1,
      name: "Villa",
      image: villa,
    },
  ];

  return (
    <div className="py-20 px-20 flex flex-col gap-8 bg-secondary">
      <h2 className="text-2xl font-bold">Browse by property type</h2>
      <div className="grid grid-cols-4 gap-8">
        {propertyTypeList.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 cursor-pointer">
            <img src={item.image} alt={item.name} />
            <p className="text-lg font-semibold flex items-center justify-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByType;
