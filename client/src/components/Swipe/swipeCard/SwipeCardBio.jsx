function SwipeCardBio({ cardData }) {
  return (
    <div className="h-[120px] p-4 bg-white text-center">
      <h3 className="font-bold text-lg mb-2">{cardData.name}</h3>
      <p className="text-sm text-gray-700">{cardData.bio}</p>
      <p className="text-sm text-gray-700">
        this is a test that appears on every card, just to see long texts
      </p>
    </div>
  );
}

export default SwipeCardBio;
