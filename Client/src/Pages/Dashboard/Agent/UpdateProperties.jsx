import React, { useEffect, useState } from "react";
import { imageUpload } from "../../../api/Utils";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  
  // Fetch property data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosSecure.get(`${import.meta.env.VITE_URL}/property/${id}`);
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const propertyTitle = form.propertyTitle.value;
    const propertyLocation = form.propertyLocation.value;
    const minRange = parseInt(form.minRange.value);
    const maxRange = parseInt(form.maxRange.value);
    const newImageFile = form.image.files[0];

    const priceRange = { minRange, maxRange };

    let updatedImageUrl = property?.propertyImage;

    if (newImageFile) {
      try {
        updatedImageUrl = await imageUpload(newImageFile);
      } catch (error) {
        toast.error("Failed to upload new image.");
        return;
      }
    }

    const updatedProperty = {
      propertyImage: updatedImageUrl,
      propertyTitle,
      propertyLocation,
      priceRange,
    };

    try {
      await axiosSecure.patch(`${import.meta.env.VITE_URL}/property/${id}`, updatedProperty);
      toast.success("Property updated successfully!");
      navigate("/dashboard/my-added-properties");
    } catch (error) {
      toast.error("Failed to update property");
    }
  };

  if (!property) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="w-full sm:max-w-lg md:max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <h2 className="text-2xl font-bold mb-4 text-center">Update Property</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    {/* Property Image */}
    <div>
      <label className="block font-semibold">Property Image URL:</label>
      <input
        type="text"
        name="propertyImage"
        defaultValue={property?.propertyImage}
        className="w-full border rounded px-3 py-2"
      />
      <input type="file" name="image" className="w-full mt-2" />
    </div>

    {/* Property Title */}
    <div>
      <label className="block font-semibold">Property Title:</label>
      <input
        type="text"
        name="propertyTitle"
        defaultValue={property?.propertyTitle}
        className="w-full border rounded px-3 py-2"
      />
    </div>

    {/* Property Location */}
    <div>
      <label className="block font-semibold">Property Location:</label>
      <input
        type="text"
        name="propertyLocation"
        defaultValue={property?.propertyLocation}
        className="w-full border rounded px-3 py-2"
      />
    </div>

    {/* Price Range */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/2">
        <label className="block font-semibold">Min Price:</label>
        <input
          type="number"
          name="minRange"
          defaultValue={property?.priceRange?.minRange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="w-full sm:w-1/2">
        <label className="block font-semibold">Max Price:</label>
        <input
          type="number"
          name="maxRange"
          defaultValue={property?.priceRange?.maxRange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Update Property
    </button>
  </form>
</div>
  );
};

export default UpdateProperties;
