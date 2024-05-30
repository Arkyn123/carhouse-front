import axios from 'axios'

const ChatID = '467827020'

export const sendDataToBot = async (data: any, files: File[]) => {
    try {
        if (!process.env.NEXT_PUBLIC_BOT_TOKEN) {
            throw new Error('BOT_TOKEN environment variable is not set');
        }
        const res = await sendMessage(data)
        if (files.length) return await sendMediaGroup(files)
        return res

    } catch (error: any) {
        console.error('Error sending data to the bot:', error.message);
    }
}

const sendMediaGroup = async (files: File[]) => {
    const formData = new FormData();
    formData.append('chat_id', ChatID);

    const mediaArray = files.map((file, index) => {
        formData.append(`photo${index}`, file);
        return { type: 'photo', media: `attach://photo${index}` };
    });

    formData.append('media', JSON.stringify(mediaArray));

    return await axios.post(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMediaGroup`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const sendMessage = async (data: any) => {
    return await axios.post(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMessage`, {
        chat_id: ChatID,
        text: `✅ Новый заказ ✅\nНомер телефона: ${data.phoneNumber}\nМодель: ${data.model}`,
    });
}