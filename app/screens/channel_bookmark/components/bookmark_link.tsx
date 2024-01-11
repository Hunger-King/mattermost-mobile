// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {Platform, View} from 'react-native';

import {useIsTablet} from '@app/hooks/device';
import FloatingTextInput from '@components/floating_text_input_label';
import FormattedText from '@components/formatted_text';
import Loading from '@components/loading';
import {useTheme} from '@context/theme';
import {debounce} from '@helpers/api/general';
import useDidUpdate from '@hooks/did_update';
import {fetchOpenGraph} from '@utils/opengraph';
import {changeOpacity, getKeyboardAppearanceFromTheme, makeStyleSheetFromTheme} from '@utils/theme';
import {typography} from '@utils/typography';
import {getUrlAfterRedirect} from '@utils/url';

type Props = {
    disabled: boolean;
    initialUrl?: string;
    resetBookmark: () => void;
    setBookmark: (url: string, title: string, imageUrl: string) => void;
}

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    viewContainer: {
        marginVertical: 32,
        width: '100%',
    },
    description: {
        marginTop: 2,
    },
    descriptionText: {
        ...typography('Body', 75),
        color: changeOpacity(theme.centerChannelColor, 0.56),
    },
    loading: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
}));

const BookmarkLink = ({disabled, initialUrl = '', resetBookmark, setBookmark}: Props) => {
    const theme = useTheme();
    const intl = useIntl();
    const isTablet = useIsTablet();
    const [error, setError] = useState('');
    const [url, setUrl] = useState(initialUrl);
    const [loading, setLoading] = useState(false);
    const styles = getStyleSheet(theme);
    const keyboard = (Platform.OS === 'android') ? 'default' : 'url';
    const subContainerStyle = [styles.viewContainer, {paddingHorizontal: isTablet ? 42 : 0}];
    const descContainer = [styles.description, {paddingHorizontal: isTablet ? 42 : 0}];

    const validateAndFetchOG = useCallback(debounce(async (text: string) => {
        setLoading(true);
        let link = await getUrlAfterRedirect(text, false);

        if (link.error) {
            link = await getUrlAfterRedirect(text, true);
        }

        if (link.url) {
            const result = await fetchOpenGraph(link.url, true);
            const title = result.title || text;
            const imageUrl = result.imageURL || result.favIcon || '';
            setLoading(false);
            setBookmark(link.url, title, imageUrl);
            return;
        }
        setError(intl.formatMessage({
            id: 'channel_bookmark_add.link.invalid',
            defaultMessage: 'Please enter a valid link',
        }));
        setLoading(false);
    }, 500), []);

    const onChangeText = useCallback((text: string) => {
        resetBookmark();
        setUrl(text);
        setError('');
    }, []);

    const onSubmitEditing = useCallback(() => {
        if (url) {
            validateAndFetchOG(url);
        }
    }, [url, error]);

    useDidUpdate(debounce(() => {
        onSubmitEditing();
    }, 300), [onSubmitEditing]);

    return (
        <View style={subContainerStyle}>
            <FloatingTextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                disableFullscreenUI={true}
                editable={!disabled}
                keyboardAppearance={getKeyboardAppearanceFromTheme(theme)}
                keyboardType={keyboard}
                returnKeyType='go'
                label={intl.formatMessage({id: 'channel_bookmark_add.link', defaultMessage: 'Link'})}
                onChangeText={onChangeText}
                theme={theme}
                error={error}
                showErrorIcon={true}
                value={url}
                onSubmitEditing={onSubmitEditing}
                endAdornment={loading &&
                    <Loading
                        size='small'
                        color={theme.buttonBg}
                        containerStyle={styles.loading}
                    />
                }
            />
            <View style={descContainer}>
                <FormattedText
                    id='channel_bookmark_add.link.input.description'
                    defaultMessage='Add a link to any post, file, or any external link'
                    style={styles.descriptionText}
                    testID='channel_bookmark_add.link.input.description'
                />
            </View>
        </View>
    );
};

export default BookmarkLink;
