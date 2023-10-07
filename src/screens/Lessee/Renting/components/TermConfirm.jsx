import { Avatar, Box, CheckIcon, Heading, Select, Stack, Text } from "native-base";
import { React } from "react";
import { Animated, ScrollView } from "react-native";
import { GradientButton } from "../../../../components/GradientButton";


const TermConfirm = ({ navigation }) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    
    const [service, setService] = React.useState("");

    const handleChangeRoute = (route) => {
        navigation.navigate(route);
    }

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            <Box
                paddingX={15}
                paddingY={30}
                width='100%'
                display='flex'
                flexDirection='column'
                minHeight='100%'
                overflow='hidden'
            >
                <Stack
                    display='flex'
                    justifyContent='space-between'
                    flexDirection='row'
                    alignItems='center'
                    paddingBottom={15}
                    paddingTop={15}
                >
                    <Heading fontSize='2xl'>Rent Term Confirmation</Heading>
                    <Avatar
                        size='sm'
                        bg='primary.500'
                        icon={<CheckIcon size='sm' color='white' />}
                    />
                </Stack>
                <ScrollView>
                    <Stack space={4}>
                        <Text fontSize='lg'>Please confirm the rental term details below:</Text>
                        <Stack space={2}>
                            <Text>Start Date: [insert start date here]</Text>
                            <Text>End Date: [insert end date here]</Text>
                            <Text>Duration: [insert duration here]</Text>
                            <Text>Price: [insert price here]</Text>
                        </Stack>
                        <Select
                            selectedValue={service}
                            minWidth={200}
                            accessibilityLabel='Select service'
                            placeholder='Select service'
                            onValueChange={(itemValue) => setService(itemValue)}
                            _selectedItem={{
                                bg: 'teal.600',
                                endIcon: <CheckIcon size={4} />,
                            }}
                        >
                            <Select.Item label='Service 1' value='service1' />
                            <Select.Item label='Service 2' value='service2' />
                            <Select.Item label='Service 3' value='service3' />
                        </Select>
                        <GradientButton onPress={() => handleChangeRoute('Payment')}>
                            Confirm Rental
                        </GradientButton>
                    </Stack>
                </ScrollView>
            </Box>
        </Animated.View>
    );
};

export default TermConfirm;
