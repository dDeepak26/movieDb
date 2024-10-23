import React from "react";
import { TMDB_IMAGE_URL } from "../utils/constant";

const Cast = ({ cast }) => {
  if (!Array.isArray(cast) || cast.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cast.map(
          (actor) =>
            actor &&
            actor.id && (
              <div
                key={actor.id}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                {actor.profile_path ? (
                  <img
                    src={TMDB_IMAGE_URL + actor.profile_path}
                    alt={actor.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="p-2">
                  <p className="font-bold text-sm">{actor.name || "Unknown"}</p>
                  <p className="text-xs text-gray-400">
                    {actor.character || "Unknown Role"}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Cast;
