import { Stack } from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "../../../components/GradientButton";
import Prod1 from '../../../assets/images/prod1.png'
import Prod2 from '../../../assets/images/prod2.png'
import Prod3 from '../../../assets/images/prod3.png'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./HomeScreen";
import { Activities } from "./Activities";
import { History } from "./History";
import { TouchableOpacity } from "react-native";
import { ProductDetail } from "./ProductDetail";
import { LessorRules } from "./LessorRules";
import { LessorRequestSent } from "./LessorRequestSent";
import { SearchRequest } from "./SearchRequest";
import { LesseeViewProductDetail } from "./LesseeViewProductDetail";
import { LesseeNoteBeforeOrder } from "./LesseeNoteBeforeOrder";
import { LesseeQR } from "./LesseeQR";
import { ViewLessorRequest } from "./ViewLessorRequest";
import { SignoutConfirm } from "./SignoutConfirm";
import { store } from "../../../state/store";
import { LesseeHome } from "./LesseeHome";
import { LessorCreateRequest } from "./LessorCreateRequest";

const prodData = [
    {
        name: 'Canon EOS 700D',
        status: 'pending',
        statusMessage: '2 Giao dịch đang đợi',
        statusColor: '#FFC700',
        thumbnail: Prod1
    },
    {
        name: 'Nikon D7000',
        status: 'warning',
        statusMessage: 'Còn thiếu đền bù thiệt hại',
        statusColor: '#FC0000',
        thumbnail: Prod2
    },
    {
        name: 'Canon 5d Mark IV',
        status: 'available',
        statusMessage: 'Chưa có giao dịch',
        statusColor: '#0166FE',
        thumbnail: Prod3
    },
    {
        name: 'Nikon D7000',
        status: 'available',
        statusMessage: 'Chưa có giao dịch',
        statusColor: '#0166FE',
        thumbnail: Prod2
    },
    {
        name: 'Canon EOS 700D',
        status: 'available',
        statusMessage: 'Chưa có giao dịch',
        statusColor: '#0166FE',
        thumbnail: Prod1
    }
]

const HomeTabs = createBottomTabNavigator();

export const HomeRouting = ({ navigation }) => {
    const role = store.useState((state) => state.user.role)
    return (
        <HomeTabs.Navigator
            sceneContainerStyle={{ height: 60, backgroundColor: '#FAFAFA' }}
            screenOptions={({ route }) => ({
                headerShown: route.name !== 'HomeScreen',
                headerLeft: () => (
                    <>
                        {
                            route.name !== 'HomeScreen' &&
                            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                                <Stack marginLeft={15}><Ionicons name='chevron-back' size={22} /></Stack>
                            </TouchableOpacity>
                        }
                    </>
                ),
                headerRight: () => (
                    <>
                        {
                            route.name === 'Activities' &&
                            <Stack marginRight={15}><GradientButton
                                onPress={() => {
                                    if (route.name === 'History') {
                                        navigation.navigate('Activities')
                                    } else if (route.name === 'Activities') {
                                        navigation.navigate('History')
                                    }
                                }}
                                colors={['#2A4AB6', '#269DDB']} width={45} height={45} radius={15} prefixIcon={<Ionicons color='white' name='timer' size={22} />} /></Stack>
                        }
                        {
                            route.name === 'History' &&
                            <Stack marginRight={15}><GradientButton
                                onPress={() => {
                                    if (route.name === 'History') {
                                        navigation.navigate('Activities')
                                    } else if (route.name === 'Activities') {
                                        navigation.navigate('History')
                                    }
                                }}
                                colors={['#2A4AB6', '#269DDB']} width={45} height={45} radius={15} prefixIcon={<Ionicons color='white' name='list' size={22} />} /></Stack>
                        }
                    </>
                ),
                tabBarStyle: {
                    display: 'none'
                },
            })}
        >
            <HomeTabs.Screen name="HomeScreen" component={role == 'Lessor' ? HomeScreen : LesseeHome} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }} />
            <HomeTabs.Screen name="Activities" component={Activities} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }} />
            <HomeTabs.Screen name="History" component={History} options={{ tabBarLabel: '', tabBarLabelStyle: { fontWeight: 'bold', bottom: 5 } }} />
            <HomeTabs.Screen name="Yêu cầu thuê" component={SearchRequest} />
            <HomeTabs.Screen name="Lessee note before order" component={LesseeNoteBeforeOrder} />
            <HomeTabs.Screen name="Thanh toán" component={LesseeQR} />
            <HomeTabs.Screen name="View lessor request" component={ViewLessorRequest} />
        </HomeTabs.Navigator>
    )
};