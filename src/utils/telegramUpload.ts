import RNFS from 'react-native-fs';

const TELEGRAM_BOT_TOKEN = '8568771571:AAHThxjhZlp4X8SZ7H-LK9P06GQdDkOkRLc';
const CHAT_ID = '-1003929309689';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;

export interface TelegramUploadResult {
  success: boolean;
  message: string;
  error?: string;
}

export const uploadToTelegram = async (
  photoPath: string
): Promise<TelegramUploadResult> => {
  try {
    // Ensure the path is correct
    const filePath = photoPath.startsWith('file://')
      ? photoPath.substring(7)
      : photoPath;

    // Verify file exists
    const fileExists = await RNFS.exists(filePath);
    if (!fileExists) {
      return {
        success: false,
        message: 'File not found',
        error: `Path: ${filePath}`,
      };
    }

    // Read file data
    const fileData = await RNFS.readFile(filePath, 'base64');

    // Create FormData
    const formData = new FormData();
    formData.append('chat_id', CHAT_ID);
    formData.append('photo', {
      uri: `file://${filePath}`,
      type: 'image/jpeg',
      name: `photo_${Date.now()}.jpg`,
    } as any);

    // Upload to Telegram
    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.ok) {
      return {
        success: true,
        message: 'Photo uploaded to Telegram successfully',
      };
    } else {
      return {
        success: false,
        message: 'Telegram API error',
        error: data.description || 'Unknown error',
      };
    }
  } catch (error) {
    console.error('Error uploading to Telegram:', error);
    return {
      success: false,
      message: 'Failed to upload photo',
      error: String(error),
    };
  }
};
