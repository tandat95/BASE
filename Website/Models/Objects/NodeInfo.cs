using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using VDMS.ContentRepository.Helper.Model;

namespace VDMS5_MVC.Models.Objects
{

    [DataContract]
    public class NodeInfo
    {
        [DataMember]
        public string Layer { get; set; }
        [DataMember]
        public HashSet<FileProperty> Properties { get; set; }
        [DataMember]
        public MimeTypeInfo MimeType { get; }
        [DataMember]
        public string Template { get; set; }
        [DataMember]
        public string Status { get; set; }
        [DataMember]
        public string ParentPath { get; set; }
        [DataMember]
        public string ParentIdPath { get; set; }
        [DataMember]
        public string Path { get; set; }
        [DataMember]
        public int ModifierId { get; set; }
        [DataMember]
        public string Modifier { get; set; }
        [DataMember]
        public DateTime? Modified { get; set; }
        [DataMember]
        public int? CreatorId { get; set; }
        [DataMember]
        public string Creator { get; set; }
        [DataMember]
        public DateTime? Created { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string Title { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public int ParentId { get; set; }
        [DataMember]
        public int NodeId { get; set; }
        [DataMember]
        public string Type { get; set; }
        [DataMember]
        public string Content { get; set; }
        [DataMember]
        public bool IsInherited { get; set; }
    }
    

    public abstract class VDMSNode
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public string ParentPath { get; set; }
        public string Layer { get; set; }
        public string InId => GetInId();

        [JsonProperty("OutId")]
        [JsonConverter(typeof(SpecialJsonConverter))]
        public string OutId => GetOutId();

        protected virtual string GetInId()
        {
            return null;
        }
        protected virtual string GetOutId()
        {
            return null;
        }

        public void AddSystemInfo(NodeInfo nodeInfo)
        {
            if (nodeInfo != null)
            {
                Id = nodeInfo.Id;
                Title = nodeInfo.Title;
                Description = nodeInfo.Description;
                Name = nodeInfo.Name;
                Path = nodeInfo.Path;
                ParentPath = nodeInfo.ParentPath;
            }
        }
    }


    public sealed class SpecialJsonConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return true;
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var reader = new JsonTextReader(new StringReader(value.ToString()));
            writer.WriteToken(reader);
        }
    }
}