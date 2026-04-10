
// function Ajouter() {
//   return <div>Ajouter</div>
// }

// export default Ajouter

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  Check,
  X,
  MapPin,
  Flag,
  Users,
  ShieldCheck,
  Video,
  RefreshCw,
  Info,
} from "lucide-react";

const fauxEtablissements = [
  { id: 1, name: "Bakeli Principal", lat: 14.7167, lng: -17.4677 },
  { id: 2, name: "Pole Design", lat: 14.7192, lng: -17.4701 },
  { id: 3, name: "Bloc Administratif", lat: 14.7215, lng: -17.4624 },
  { id: 4, name: "Salle Reseau", lat: 14.7181, lng: -17.4689 },
];

const typesChemin = [
  {
    key: "community",
    icon: Users,
    label: "Communautaire",
    desc: "Partage avec tous",
  },
  {
    key: "official",
    icon: ShieldCheck,
    label: "Officiel",
    desc: "Valide par un etablissement",
  },
];

export default function Ajouter() {
  const navigate = useNavigate();

  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [pathType, setPathType] = useState("community");
  const [destinations, setDestinations] = useState([]);
  const [selectedEstab, setSelectedEstab] = useState(null);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [searchDestination, setSearchDestination] = useState("");

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoadingDestinations(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDestinations(fauxEtablissements);
      } finally {
        setLoadingDestinations(false);
      }
    };

    loadDestinations();
  }, []);

  const filteredDestinations = useMemo(() => {
    if (!searchDestination.trim()) return destinations;
    return destinations.filter((item) =>
      item.name.toLowerCase().includes(searchDestination.toLowerCase())
    );
  }, [destinations, searchDestination]);

  const validate = () => {
    if (!departure.trim()) {
      alert("Veuillez saisir un point de depart");
      return false;
    }

    if (!destination || !selectedEstab) {
      alert("Veuillez selectionner une destination");
      return false;
    }

    if (departure.trim().toLowerCase() === destination.toLowerCase()) {
      alert("Le depart et la destination doivent etre differents");
      return false;
    }

    return true;
  };

  const handleRecord = () => {
    if (!validate()) return;

    navigate("/video-upload", {
      state: {
        departure: departure.trim(),
        destination,
        pathType,
        establishmentId: selectedEstab?.id,
      },
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center font-sans">
      <div className="relative w-full max-w-[450px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-[#FEBD00] px-6 pt-10 pb-7 rounded-b-[35px]">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-black"
          >
            <ArrowLeft size={18} />
            Retour
          </button>

          <h1 className="text-3xl font-black text-white">Creer un chemin</h1>
          <p className="mt-2 text-sm text-white/90">
            Aidez la communaute a se deplacer plus facilement
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Point de depart
              </label>

              <div
                className={`flex items-center gap-3 rounded-2xl border px-4 py-4 ${
                  departure.trim()
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <MapPin
                  size={20}
                  className={departure.trim() ? "text-green-500" : "text-slate-400"}
                />

                <input
                  type="text"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  placeholder="Ex: Entree principale, Bloc A..."
                  className="w-full bg-transparent text-sm text-slate-800 outline-none"
                />

                {departure.length > 0 ? (
                  <button onClick={() => setDeparture("")}>
                    <X size={18} className="text-slate-400" />
                  </button>
                ) : null}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Destination
              </label>

              <button
                onClick={() => setShowDestinationModal(true)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left ${
                  destination
                    ? "border-[#FEBD00] bg-yellow-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <Flag
                  size={20}
                  className={destination ? "text-red-500" : "text-slate-400"}
                />

                <span
                  className={`flex-1 text-sm ${
                    destination ? "text-slate-800 font-medium" : "text-slate-400"
                  }`}
                >
                  {destination || "Selectionner une destination..."}
                </span>

                {loadingDestinations ? (
                  <RefreshCw size={18} className="animate-spin text-[#FEBD00]" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400" />
                )}
              </button>
            </div>

            {departure.trim() && destination ? (
              <div className="flex items-center gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3">
                <MapPin size={18} className="text-[#FEBD00]" />
                <p className="text-sm font-semibold text-slate-700">
                  {departure.trim()} → {destination}
                </p>
              </div>
            ) : null}

            <div>
              <label className="mb-3 block text-sm font-bold text-slate-800">
                Type de chemin
              </label>

              <div className="grid grid-cols-2 gap-3">
                {typesChemin.map((type) => {
                  const Icon = type.icon;
                  const active = pathType === type.key;

                  return (
                    <button
                      key={type.key}
                      onClick={() => setPathType(type.key)}
                      className={`rounded-2xl border-2 p-4 text-center transition ${
                        active
                          ? "border-[#FEBD00] bg-yellow-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex justify-center">
                        <Icon
                          size={28}
                          className={active ? "text-[#FEBD00]" : "text-slate-500"}
                        />
                      </div>

                      <p
                        className={`mt-3 text-sm font-bold ${
                          active ? "text-[#FEBD00]" : "text-slate-800"
                        }`}
                      >
                        {type.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {type.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-100 bg-white p-5">
              <div className="flex items-center gap-2">
                <Info size={18} className="text-[#FEBD00]" />
                <h2 className="text-base font-black text-slate-900">
                  Comment ca marche ?
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  "Saisissez votre point de depart",
                  "Selectionnez la destination dans la liste",
                  "Choisissez le type de chemin",
                  "Passez ensuite a l'enregistrement video",
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FEBD00] text-xs font-bold text-white">
                      {index + 1}
                    </div>

                    <p className="pt-1 text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleRecord}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#FEBD00] px-5 py-4 text-base font-bold text-white shadow-lg transition active:scale-[0.98]"
            >
              <Video size={22} />
              Enregistrer la video
            </button>
          </div>
        </div>

        {showDestinationModal ? (
          <div className="absolute inset-0 z-30 flex items-end bg-black/50">
            <div className="w-full rounded-t-[28px] bg-white max-h-[75%] overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <h3 className="text-lg font-black text-slate-900">
                  Choisir la destination
                </h3>

                <button
                  onClick={() => setShowDestinationModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
                >
                  <X size={18} className="text-slate-700" />
                </button>
              </div>

              <div className="px-5 pt-4">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <SearchIcon />
                  <input
                    type="text"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    placeholder="Rechercher une destination..."
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="overflow-y-auto px-4 py-4">
                {loadingDestinations ? (
                  <div className="py-12 text-center">
                    <RefreshCw size={28} className="mx-auto animate-spin text-[#FEBD00]" />
                    <p className="mt-4 text-sm text-slate-500">
                      Chargement des destinations...
                    </p>
                  </div>
                ) : filteredDestinations.length === 0 ? (
                  <div className="py-12 text-center">
                    <Flag size={36} className="mx-auto text-slate-300" />
                    <p className="mt-4 text-sm text-slate-500">
                      Aucune destination disponible
                    </p>
                    <p className=""></p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredDestinations.map((item) => {
                      const selected = selectedEstab?.id === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setDestination(item.name);
                            setSelectedEstab(item);
                            setShowDestinationModal(false);
                            setSearchDestination("");
                          }}
                          className={`flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left ${
                            selected ? "bg-yellow-50" : "bg-white hover:bg-slate-50"
                          }`}
                        >
                          <div className="shrink-0">
                            {selected ? (
                              <Check size={20} className="text-[#FEBD00]" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border border-slate-300" />
                            )}
                          </div>

                          <div className="flex-1">
                            <p
                              className={`text-sm ${
                                selected
                                  ? "font-bold text-[#FEBD00]"
                                  : "font-medium text-slate-800"
                              }`}
                            >
                              {item.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {Number(item.lat).toFixed(4)}, {Number(item.lng).toFixed(4)}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#D9D9D9] rounded-full opacity-40" />
      </div>
    </div>
  );
}

function SearchIcon() {
  return <RefreshCw size={16} className="text-slate-400 opacity-0" />;
}
