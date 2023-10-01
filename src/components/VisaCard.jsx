import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Stack, Text } from "native-base";

export const VisaCard = ({ colors = ['#EF96FF', '#FF56A9', '#FFAA6C'] }) => {
    return (
        <Stack
            style={{
                width: '100%',
                height: 200,
                borderRadius: 15,
            }}
        >
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0.1 }}
                end={{ x: 1, y: 1 }}
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    borderRadius: 25,
                    padding: 15
                }}
            >
                <Text fontSize={28} fontWeight='bold'>452404...4835</Text>
                <Text fontSize={18} fontWeight='semibold'>BACH DOAN VUONG</Text>
                <Stack style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                    <Stack style={{ display: 'flex', flexDirection: 'row', columnGap: 15, alignItems: 'center' }}>
                        <Text fontSize={12}>Join at: 09/22</Text>
                        <Text fontSize={12}>Expire at: 09/27</Text>
                    </Stack>
                    <Button size='xm' padding='2px' paddingRight='7px' borderRadius={10} backgroundColor='#000' leftIcon={<Stack  style={{marginLeft: 5, backgroundColor: 'grey', borderRadius: '50%'}}><Ionicons style={{margin: 3}} name="lock-closed"/></Stack>}><Text fontWeight='semibold' fontSize={12} color='#FFF'>CCV</Text></Button>
                </Stack>
            </LinearGradient>
        </Stack>
    );
}