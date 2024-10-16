function CardBio({ name, bio }) {
  return (
    <div className="h-[120px] p-4 bg-white text-center">
      <h3 className="font-bold text-lg mb-2">{name}</h3>
      <p className="text-sm text-gray-700">{bio}</p>
      <p>this is a test that appears everywhere, just to see long texts</p>
    </div>
  );
}

export default CardBio;
