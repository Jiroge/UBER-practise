import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHANGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigateion = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigateion.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-3 rounded-full z-50`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride -{" "}
          {parseFloat(travelTimeInformation?.distance?.text) *
            (1.609344).toFixed(2)}{" "}
          km
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            disable={!selected}
            onPress={() => setSelected(item)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 40,
              paddingRight: 40,
              alignItems: "center",
              backgroundColor: id === selected.id ? "#e5e7eb" : "#fff"
            }}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("th", {
                style: "currency",
                currency: "THB",
                maximumFractionDigits: 0,
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHANGE_RATE *
                  multiplier) /
                  5
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={{
            backgroundColor: selected ? "#000" : "#dbdbdb",
            paddingVertical: 8,
            margin: 8,
          }}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
