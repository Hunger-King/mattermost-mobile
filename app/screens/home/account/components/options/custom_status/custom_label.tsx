// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import moment from 'moment-timezone';
import React from 'react';
import {View} from 'react-native';

import ClearButton from '@components/custom_status/clear_button';
import CustomStatusExpiry from '@components/custom_status/custom_status_expiry';
import FormattedText from '@components/formatted_text';
import {useTheme} from '@context/theme';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import CustomStatusText from './custom_status_text';

type CustomLabelProps = {
    customStatus: UserCustomStatus;
    isCustomStatusExpirySupported: boolean;
    isStatusSet: boolean;
    onClearCustomStatus: () => void;
    showRetryMessage: boolean;
};

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        clearButton: {
            position: 'absolute',
            top: 4,
            right: 14,
        },
        customStatusTextContainer: {
            width: '70%',
            marginLeft: 16,
        },
        customStatusExpiryText: {
            paddingTop: 3,
            fontSize: 15,
            color: changeOpacity(theme.centerChannelColor, 0.35),
        },
        retryMessage: {
            color: theme.errorTextColor,
            paddingBottom: 25,
        },
    };
});

const CustomLabel = ({customStatus, isCustomStatusExpirySupported, isStatusSet, onClearCustomStatus, showRetryMessage}: CustomLabelProps) => {
    const theme = useTheme();
    const styles = getStyleSheet(theme);

    return (
        <>
            <View style={styles.customStatusTextContainer}>
                <CustomStatusText
                    isStatusSet={Boolean(isStatusSet)}
                    customStatus={customStatus}
                />
                {Boolean(isStatusSet && isCustomStatusExpirySupported && customStatus?.duration) && (
                    <CustomStatusExpiry
                        time={moment(customStatus?.expires_at)}
                        theme={theme}
                        textStyles={styles.customStatusExpiryText}
                        withinBrackets={true}
                        showPrefix={true}
                        testID={'custom_status.expiry'}
                    />
                )}
            </View>
            {showRetryMessage && (
                <FormattedText
                    id={'custom_status.failure_message'}
                    defaultMessage='Failed to update status. Try again'
                    style={styles.retryMessage}
                />
            )}
            {isStatusSet && (
                <View style={styles.clearButton}>
                    <ClearButton
                        handlePress={onClearCustomStatus}
                        theme={theme}
                        testID='settings.sidebar.custom_status.action.clear'
                    />
                </View>
            )}
        </>
    );
};

export default CustomLabel;
