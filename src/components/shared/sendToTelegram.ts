'use client'

import axios from 'axios'

export const sendDataToBot = async (data: any, files: File[] = [], ChatID: string) => {
    try {
        if (!process.env.NEXT_PUBLIC_BOT_TOKEN) {
            throw new Error('BOT_TOKEN environment variable is not set')
        }
        const res = await sendMessage(data, ChatID)
        if (files.length) return await sendMediaGroup(files, ChatID)
        return res

    } catch (error: any) {
        console.error('Error sending data to the bot:', error.message);
    }
}

const sendMediaGroup = async (files: File[], ChatID: string) => {
    const formData = new FormData();
    formData.append('chat_id', ChatID);

    const mediaArray = files.map((file, index) => {
        formData.append(`photo${index}`, file)
        return { type: 'photo', media: `attach://photo${index}` }
    })

    formData.append('media', JSON.stringify(mediaArray));

    return await axios.post(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMediaGroup`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const sendMessage = async (data: any, ChatID: string) => {
    return await axios.post(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMessage`, {
        chat_id: ChatID,
        text: generateMessage(data),
    });
}

const generateMessage = (data: any) => {
    let text = '✅ Новый заказ ✅\n';
    if (data.model) text += `Модель: ${data.model}\n`;
    if (data.mileage) text += `Пробег: ${data.mileage}\n`;
    if (data.condition) text += `Состояние: ${data.condition}\n`;
    if (data.legal) text += `Юридический статус: ${data.legal}\n`;
    if (data.urgency) text += `Срочность: ${data.urgency}\n`;
    if (data.price) text += `Цена: ${data.price}\n`;
    if (data.phoneNumber) text += `Номер телефона: ${data.phoneNumber}\n`;
    return text;
};
