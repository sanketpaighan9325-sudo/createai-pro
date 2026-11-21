export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return Response.json(
        { error: "Please enter an image prompt." },
        { status: 400 }
      );
    }

    if (prompt.length > 2048) {
      return Response.json(
        { error: "Prompt is too long." },
        { status: 400 }
      );
    }

    const result = await env.AI.run(
      "@cf/black-forest-labs/flux-1-schnell",
      {
        prompt,
        steps: 4
      }
    );

    return Response.json({
      image: `data:image/jpeg;base64,${result.image}`
    });
  } catch (error) {
    return Response.json(
      { error: "Image generation failed. Please try again." },
      { status: 500 }
    );
  }
}
