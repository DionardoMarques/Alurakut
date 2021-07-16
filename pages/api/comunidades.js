import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = 'b8b3ef931d7535506a1b406cec74ab';
        const client = new SiteClient(TOKEN);

        //Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "972333", // ID do Model de "Communities" é criado pelo Dato
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/dionardomarques.png",
            // creatorSlug: "dionardomarques"
        })

        console.log(registroCriado);

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}