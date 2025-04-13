import prisma from "../db/db_client";
import { serializer } from "./middleware/pre_serializer";
import { IEntityId } from "./schemas/common";
import { ApiError } from "../errors";
import { FastifyInstance } from "fastify";
import { Form, Prisma } from "@prisma/client";

async function formRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer);

  const log = app.log.child({ component: "formRoutes" });

  app.get<{
    Params: IEntityId;
    Reply: Form;
  }>("/:id", {
    async handler(req, reply) {
      const { params } = req;
      const { id } = params;
      log.debug("get form by id");
      try {
        const form = await prisma.form.findUniqueOrThrow({ where: { id } });
        reply.send(form);
      } catch (err: any) {
        log.error({ err }, err.message);
        throw new ApiError("failed to fetch form", 400);
      }
    },
  });

  app.post<{
    Body: Form;
    Reply: Form;
  }>("/", {
    async handler(req, reply) {
      const { body } = req;
      log.debug("create form");
      try {
        const form = await prisma.form.create({
          data: {
            ...body,
            fields: body.fields ?? Prisma.JsonNull,
          },
        });
        reply.send(form);
      } catch (err: any) {
        log.error({ err }, err.message);
        throw new ApiError("failed to create form", 400);
      }
    },
  });

  app.post<{
    Params: IEntityId;
    Body: { answers: { [key: string]: string } };
    Reply: { message: string };
  }>("/:id/submit", {
    async handler(req, reply) {
      const { params, body } = req;
      const { id } = params;
      const { answers } = body;

      try {
        const form = await prisma.form.findUniqueOrThrow({ where: { id } });

        if (!form) {
          throw new ApiError("form not found", 404);
        }

        const sourceRecord = await prisma.sourceRecord.create({
          data: {
            formId: id,
          },
        });

        const sourceDataEntries = Object.entries(answers).map(
          ([question, answer]) => ({
            sourceRecordId: sourceRecord.id,
            question,
            answer,
          })
        );

        await prisma.sourceData.createMany({
          data: sourceDataEntries,
        });
        reply.send({ message: "Answers submitted successfully" });
      } catch (err: any) {
        log.error({ err }, err.message);
        throw new ApiError("failed to submit answers", 400);
      }
    },
  });
}

export default formRoutes;
